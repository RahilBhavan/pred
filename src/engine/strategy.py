from typing import List, Tuple
from loguru import logger
from ..execution.models import OrderBook, OrderBookEntry

class MarketMakerStrategy:
    def __init__(self, spread: float = 0.02, order_size: float = 100.0):
        self.spread = spread
        self.order_size = order_size

    def calculate_quotes(self, order_book: OrderBook) -> Tuple[float, float]:
        """
        Simple mid-price spread strategy.
        In a real world scenario, this would account for inventory risk and volatility.
        """
        if not order_book.bids or not order_book.asks:
            logger.warning(f"Empty order book for market {order_book.market_id}")
            return 0.0, 0.0

        best_bid = order_book.bids[0].price
        best_ask = order_book.asks[0].price
        mid_price = (best_bid + best_ask) / 2

        my_bid = mid_price * (1 - self.spread / 2)
        my_ask = mid_price * (1 + self.spread / 2)

        logger.info(f"Calculated quotes for {order_book.market_id}: Bid {my_bid:.4f}, Ask {my_ask:.4f}")
        return my_bid, my_ask
