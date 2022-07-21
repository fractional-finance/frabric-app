/* global BigInt */

/**
 * MarketOrder model. Aggregates multiple orders at the same price level.
 * @property {string} id ID of the order
 * @property {MarketOrderType} type Type of the order (e.g. Buy or Sell)
 * @property {BigInt} price Price stored as BigInt
 * @property {number} totalAmount Amount of tokens in the aggregated order
 */
class MarketOrder {
  constructor(
    id,
    type,
    price,
    totalAmount
  ) {
    this.id = id
    this.type = type
    this.price = BigInt(price)
    this.totalAmount = totalAmount;
  }
}

const MarketOrderType = {
  Buy: "Buy",
  Sell: "Sell"
}

export { MarketOrder, MarketOrderType }