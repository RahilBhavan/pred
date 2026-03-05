from datetime import datetime
from src.engine.strategy import MarketMakerStrategy
from src.execution.models import OrderBook, OrderBookEntry, Position, RiskMetrics

def test_inventory_skewing():
    strategy = MarketMakerStrategy(spread=0.02, inventory_skew_factor=0.1)
    order_book = OrderBook(
        market_id="test-market",
        bids=[OrderBookEntry(price=0.48, amount=100)],
        asks=[OrderBookEntry(price=0.52, amount=100)],
        timestamp=datetime.now()
    )
    
    # 1. Neutral Position: Mid = 0.50, Bid = 0.49, Ask = 0.51
    bid_n, ask_n = strategy.calculate_quotes(order_book)
    assert bid_n == 0.49
    assert ask_n == 0.51
    
    # 2. Long Position: Should lower bid and lower ask
    # norm_inventory = 500 / 1000 = 0.5
    # skew = 0.5 * 0.1 = 0.05
    # adjusted_mid = 0.50 - 0.05 = 0.45
    # new_bid = 0.45 - 0.01 = 0.44
    # new_ask = 0.45 + 0.01 = 0.46
    pos_long = Position(market_id="test-market", outcome="Yes", amount=500, average_price=0.5)
    risk = RiskMetrics(max_position_size=1000, max_drawdown_hourly=0.05)
    
    bid_l, ask_l = strategy.calculate_quotes(order_book, pos_long, risk)
    assert bid_l < bid_n
    assert ask_l < ask_n
    assert bid_l == 0.44
    assert ask_l == 0.46

def test_toxic_flow_detection():
    strategy = MarketMakerStrategy(spread=0.02)
    # Extreme imbalance (5000 bids vs 100 asks)
    order_book = OrderBook(
        market_id="test-market",
        bids=[OrderBookEntry(price=0.48, amount=5000)],
        asks=[OrderBookEntry(price=0.52, amount=100)],
        timestamp=datetime.now()
    )
    
    bid, ask = strategy.calculate_quotes(order_book)
    # Spread should be doubled from 0.02 to 0.04
    # Mid = 0.50, Bid = 0.48, Ask = 0.52
    assert bid == 0.48
    assert ask == 0.52
