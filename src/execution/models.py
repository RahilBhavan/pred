from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Market(BaseModel):
    id: str
    name: str
    description: str
    status: str
    outcomes: List[str]
    liquidity: float = 0.0

class Order(BaseModel):
    order_id: str
    market_id: str
    outcome: str
    side: str  # "BUY" or "SELL"
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
