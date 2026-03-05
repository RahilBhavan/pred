from typing import Tuple, Dict, List, Optional
from loguru import logger
import math
from datetime import datetime, timedelta
from ..execution.models import OrderBook, OrderBookEntry, Position, RiskMetrics

class MarketMakerStrategy:
    def __init__(
        self, 
        base_spread: float = 0.02, 
        order_size: float = 100.0,
        inventory_skew_factor: float = 0.05,
        toxic_flow_threshold: float = 2.0,  # multiplier of average volume
        dynamic_vol_multiplier: float = 1.0
    ):
        self.base_spread = base_spread
        self.order_size = order_size
        self.inventory_skew_factor = inventory_skew_factor
        self.toxic_flow_threshold = toxic_flow_threshold
        self.dynamic_vol_multiplier = dynamic_vol_multiplier
        
        # Track volume for toxic flow detection
        self.volume_history: Dict[str, List[Tuple[datetime, float]]] = {} 

    def calculate_quotes(
        self, 
        order_book: OrderBook, 
        position: Optional[Position] = None,
        risk: Optional[RiskMetrics] = None
    ) -> Tuple[float, float]:
        """
        Advanced quoting with inventory skewing and toxic flow detection.
        """
        if risk and risk.is_halted:
            logger.warning(f"Strategy HALTED for {order_book.market_id} due to risk limits.")
            return 0.0, 0.0

        if not order_book.bids or not order_book.asks:
            return 0.0, 0.0

        # 1. Base Pricing
        best_bid = order_book.bids[0].price
        best_ask = order_book.asks[0].price
        mid_price = (best_bid + best_ask) / 2
        
        # 2. Dynamic Volatility Adjustment (Placeholder for ATR logic)
        current_spread = self.base_spread * self.dynamic_vol_multiplier
        
        # 3. Adverse Selection Protection (Toxic Flow Detection)
        if self._is_toxic_flow(order_book):
            logger.info(f"Toxic flow detected for {order_book.market_id}, widening spread.")
            current_spread *= 2.0  # Widen spread to reduce risk of being picked off

        # 4. Inventory Skewing
        # Goal: If long, lower bid and lower ask to encourage selling.
        # Delta = Inventory * Skew Factor
        inventory_level = position.amount if position else 0.0
        # Normalize inventory by max position size if available
        norm_inventory = inventory_level / (risk.max_position_size if risk else 1000.0)
        
        skew = norm_inventory * self.inventory_skew_factor
        
        # Adjusted Mid Price shifts away from our heavy side
        # If norm_inventory is positive (long), adjusted_mid is lower.
        adjusted_mid = mid_price - skew
        
        my_bid = adjusted_mid - (current_spread / 2)
        my_ask = adjusted_mid + (current_spread / 2)

        # Safety: Ensure we don't cross our own quotes or place invalid prices
        my_bid = max(0.01, min(0.98, my_bid))
        my_ask = max(0.02, min(0.99, my_ask))
        
        if my_bid >= my_ask:
            my_ask = my_bid + 0.01

        logger.debug(
            f"Quotes for {order_book.market_id}: Bid {my_bid:.4f}, Ask {my_ask:.4f} "
            f"(Mid: {mid_price:.4f}, Skew: {skew:.4f}, Spread: {current_spread:.4f})"
        )
        return round(my_bid, 4), round(my_ask, 4)

    def _is_toxic_flow(self, order_book: OrderBook) -> bool:
        """
        Detects if one side of the book is being aggressively cleared.
        """
        # Simplified: Check if bid/ask imbalance is extreme
        total_bid_depth = sum(b.amount for b in order_book.bids[:5])
        total_ask_depth = sum(a.amount for a in order_book.asks[:5])
        
        if total_bid_depth == 0 or total_ask_depth == 0:
            return True
            
        imbalance = max(total_bid_depth, total_ask_depth) / min(total_bid_depth, total_ask_depth)
        return imbalance > 5.0  # Threshold for extreme imbalance
