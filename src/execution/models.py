from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
from enum import Enum

class OrderSide(str, Enum):
    BUY = "BUY"
    SELL = "SELL"

class MarketStatus(str, Enum):
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    SETTLED = "SETTLED"

class Market(BaseModel):
    id: str
    name: str
    description: str
    status: MarketStatus
    outcomes: List[str]
    liquidity: float = 0.0

class Order(BaseModel):
    order_id: str
    market_id: str
    outcome: str
    side: OrderSide
    price: float
    amount: float
    status: str
    created_at: datetime

class OrderBookEntry(BaseModel):
    price: float
    amount: float

class OrderBook(BaseModel):
    market_id: str
    bids: List[OrderBookEntry]
    asks: List[OrderBookEntry]
    timestamp: datetime

class Position(BaseModel):
    market_id: str
    outcome: str
    amount: float  # Positive for long, negative for short (though usually just 0+ in prediction markets)
    average_price: float
    unrealized_pnl: float = 0.0

class AccountState(BaseModel):
    available_balance: float
    positions: Dict[str, Position] = {}  # key: market_id_outcome
    total_equity: float

class RiskMetrics(BaseModel):
    max_position_size: float
    max_drawdown_hourly: float
    current_hourly_drawdown: float = 0.0
    is_halted: bool = False
