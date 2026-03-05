from typing import Dict, Optional
from loguru import logger
from datetime import datetime, timedelta
from ..execution.models import RiskMetrics, AccountState, Position

class RiskManager:
    def __init__(
        self, 
        max_position_size: float = 1000.0,
        max_drawdown_hourly: float = 0.05,  # 5%
        min_gas_balance: float = 0.01      # ETH
    ):
        self.metrics = RiskMetrics(
            max_position_size=max_position_size,
            max_drawdown_hourly=max_drawdown_hourly
        )
        self.min_gas_balance = min_gas_balance
        self.last_equity_checkpoint = 0.0
        self.last_checkpoint_time = datetime.now()

    def update_metrics(self, account_state: AccountState, gas_balance: float):
        """
        Calculates drawdown and checks for circuit breakers.
        """
        current_equity = account_state.total_equity
        
        # Hourly checkpoint for drawdown calculation
        if datetime.now() - self.last_checkpoint_time > timedelta(hours=1):
            self.last_equity_checkpoint = current_equity
            self.last_checkpoint_time = datetime.now()
            self.metrics.current_hourly_drawdown = 0.0
        elif self.last_equity_checkpoint > 0:
            drawdown = (self.last_equity_checkpoint - current_equity) / self.last_equity_checkpoint
            self.metrics.current_hourly_drawdown = max(0.0, drawdown)

        # 1. Circuit Breaker: Max Hourly Drawdown
        if self.metrics.current_hourly_drawdown >= self.metrics.max_drawdown_hourly:
            logger.critical(f"CIRCUIT BREAKER: Hourly drawdown ({self.metrics.current_hourly_drawdown:.2%}) exceeded limit!")
            self.metrics.is_halted = True

        # 2. Wallet Health Check
        if gas_balance < self.min_gas_balance:
            logger.warning(f"LOW GAS ALERT: {gas_balance} ETH. Threshold: {self.min_gas_balance}")
            # Optional: halt on critical gas levels
            if gas_balance < self.min_gas_balance / 10:
                self.metrics.is_halted = True

    def validate_order(self, market_id: str, outcome: str, amount: float, current_pos: float) -> bool:
        """
        Check if an order violates position limits.
        """
        if self.metrics.is_halted:
            return False
            
        new_position = abs(current_pos + amount)
        if new_position > self.metrics.max_position_size:
            logger.warning(f"Order rejected: Exceeds max position size ({new_position} > {self.metrics.max_position_size})")
            return False
            
        return True
