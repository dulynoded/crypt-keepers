const models = require('../models');
const gdax = require('../../helpers/gdax.js')


module.exports = {
  range: {
    get: (req, res) => {
      let { coin, dateStart, dateEnd, granularity } = req.query;
      granularity /= 1000;
      dateStart = Number(dateStart);
      dateEnd = Number(dateEnd);
      gdax.getTimeSeriesByRange(coin, dateStart, dateEnd, granularity)
        .then((series) => {
          res.json(series);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        });
    },
    post: (req, res) => {
      models.range.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
  },
  ticker: {
    get: (req, res) => {
      gdax.getTickerData('BTC')
        .then((ticker) => {
          res.json(ticker);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        });
    },
    post: (req, res) => {
      models.range.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
  },
  search: {
    get: (req, res) => {
      let {currency} = req.query; // get currency from req.query

      models.search.get(currency)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      models.search.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
  },

  list: {
    get: (req, res) => {
      models.list.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      models.list.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
  },

  user: {
    get: (req, res) => {
      models.user.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
    post: (req, res) => {
      models.user.post()
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          res.status(404).send();
          throw err;
        });
    },
  },

};
