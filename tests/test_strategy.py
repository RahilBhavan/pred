from datetime import datetime
from src.engine.strategy import MarketMakerStrategy
from src.execution.models import OrderBook, OrderBookEntry

def test_calculate_quotes():
    strategy = MarketMakerStrategy(spread=0.02)
    order_book = OrderBook(
        market_id="test-market",
        bids=[OrderBookEntry(price=0.48, amount=100)],
        asks=[OrderBookEntry(price=0.52, amount=100)],
        timestamp=datetime.now()
    )

    my_bid, my_ask = strategy.calculate_quotes(order_book)

    # Mid price = (0.48 + 0.52) / 2 = 0.50
    # Expected Bid = 0.50 * (1 - 0.01) = 0.495
    # Expected Ask = 0.50 * (1 + 0.01) = 0.505
    assert my_bid == 0.495
    assert my_ask == 0.505

def test_empty_order_book():
    strategy = MarketMakerStrategy()
    order_book = OrderBook(
        market_id="test-market",
        bids=[],
        asks=[],
        timestamp=datetime.now()
    )
    my_bid, my_ask = strategy.calculate_quotes(order_book)
    assert my_bid == 0.0
    assert my_ask == 0.0
