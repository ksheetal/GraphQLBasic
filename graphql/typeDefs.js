const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    name: String!
    age: String!
    married: String!
  }

  type Post {
    userId: Int!
    id: Int!
    title: String!
    body: String!
  }

  type ytd {
    volume: String!
    price_change: String!
    price_change_pct: String!
    volume_change: String!
    volume_change_pct: String!
    market_cap_change: String!
    market_cap_change_pct: String!
  }

  type StockData {
    id: String!
    currency: String!
    symbol: String!
    name: String!
    logo_url: String!
    status: String!
    price: String!
    price_date: String!
    price_timestamp: String!
    circulating_supply: String!
    market_cap: String!
    market_cap_dominance: String!
    num_exchanges: String!
    num_pairs: String!
    num_pairs_unmapped: String!
    first_candle: String!
    first_trade: String!
    first_order_book: String!
    rank: String!
    rank_delta: String!
    high: String!
    high_timestamp: String!
    ytd: ytd!
    _1d:                  # numeric as key not allowed in graphQL
  }

  # Query
  type Query {
    getAllUsers: [User!]!
    getAllPosts: [Post!]!
    getAllStockData: [StockData!]!
  }
`;

module.exports = { typeDefs };
