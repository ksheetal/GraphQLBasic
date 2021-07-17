const resolvers = {
  Query: {
    getAllUsers() {
      return users;
    },
    async getAllStockData() {
      const data = ["BTC", "ETH"];
      const res = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=7e69217413100117711004501a2a5e57&currency=BTC,ETH&ids=${data}`
      );
      //  console.log(res.data);
      res.data.filter((i) => {
        //console.log(i);
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
};

module.exports = { resolvers };
