const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  currency: { type: String, required: false },
  symbol: { type: String, required: false },
  name: { type: String, required: false },
  id: { type: String, required: false },
  currency: { type: String, required: false },
  symbol: { type: String, required: false },
  name: { type: String, required: false },
  logo_url: { type: String, required: false },
  status: { type: String, required: false },
  price: { type: String, required: false },
  price_date: { type: String, required: false },
  price_timestamp: { type: String, required: false },
  circulating_supply: { type: String, required: false },
  market_cap: { type: String, required: false },
  market_cap_dominance: { type: String, required: false },
  num_exchanges: { type: String, required: false },
  num_pairs: { type: String, required: false },
  num_pairs_unmapped: { type: String, required: false },
  first_candle: { type: String, required: false },
  first_trade: { type: String, required: false },
  first_order_book: { type: String, required: false },
  rank: { type: String, required: false },
  rank_delta: { type: String, required: false },
  high: { type: String, required: false },
  high_timestamp: { type: String, required: false },
  ytd: {
    volume: { type: String, require: false },
    price_change: { type: String, require: false },
    price_change_pct: { type: String, require: false },
    volume_change: { type: String, require: false },
    volume_change_pct: { type: String, require: false },
    market_cap_change: { type: String, require: false },
    market_cap_change_pct: { type: String, require: false },
  },
});

module.exports = mongoose.model("StockData", stockSchema);
