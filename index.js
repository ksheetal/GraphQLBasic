const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const axios = require("axios");
const fetch = require("node-fetch");
const { gql } = require("apollo-server-express");
const { users } = require("./fakeData");
const mongoose = require("mongoose");
const StockData = require("./db/Model");
require("dotenv").config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;

mongoose.connect("mongodb://mongo:27017/graphQLData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

const typeDefs = gql`
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
  }

  # Query
  type Query {
    getAllStockData: [StockData!]!
  }

  type Mutation {
    createStockData(id: String!): StockData!
  }
`;

const resolvers = {
  Query: {
    async getAllStockData() {
      const data = ["BTC", "ETH"];
      const res = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=7e69217413100117711004501a2a5e57&currency=BTC,ETH&ids=${data}`
      );

      res.data.filter((i) => {
        if (i.id === "BTC") {
          const stockData = new StockData({
            _id: new mongoose.Types.ObjectId(),
            symbol: i.symbol,
            name: i.name,
            logo_url: i.logo_url,
            status: i.status,
            price: i.price,
            price_date: i.price_date,
            price_timestamp: i.price_timestamp,
            circulating_supply: i.circulating_supply,
            market_cap: i.market_cap,
            market_cap_dominance: i.market_cap_dominance,
            num_exchanges: i.num_exchanges,
            num_pairs: i.num_pairs,
            num_pairs_unmapped: i.num_pairs_unmapped,
            first_candle: i.first_candle,
            first_trade: i.first_trade,
            first_order_book: i.first_order_book,
            rank: i.rank,
            rank_delta: i.rank_delta,
            high: i.high,
            high_timestamp: i.high_timestamp,
            ytd: {
              volume: i.ytd.volume,
              price_change: i.ytd.price_change,
              price_change_pct: i.ytd.price_change_pct,
              volume_change: i.ytd.volume_change,
              volume_change_pct: i.ytd.volume_change_pct,
              market_cap_change: i.ytd.market_cap_change,
              market_cap_change_pct: i.ytd.market_cap_change_pct,
            },
          });
          stockData.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("Stock Data Added succussfully!");
          });
        }
      });

      return res.data;
    },
  },

  Mutation: {
    // just adding mutation for one key as of now;
    createStockData(parent, args) {
      const newStockData = args;
      const _newStockData = new StockData({
        _id: new mongoose.Types.ObjectId(),
        id: newStockData.id,
      });

      _newStockData.save(function (err, doc) {
        if (err) {
          return console.error(err);
        } else {
          console.log("Stock Data Added succussfully!");
          return newStockData;
        }
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 1234 }, () => {
  console.log("SERVER RUNNING ON PORT :: 1234");
});
