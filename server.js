require('isomorphic-fetch');

const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const recastHandler = require('./handlers/recast');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.post('/converse', (req, res) => {
      return recastHandler(req, res);
    });

    server.all('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(3000, err => {
      if (err) {
        throw err;
      }
      console.log(`listening on port 3000`);
    });
  });
