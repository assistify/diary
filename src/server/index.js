const express = require('express');
const request = require('request');

const app = express();
const logger = console;
const PORT = process.env.PORT || 4001;

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/image/*', async (req, res) => {
  const url = decodeURIComponent(req.path.replace(/\/image\//, ''));
  request(url).pipe(res);
});

app.listen(PORT, () => {
  logger.info('Listening on port 4001');
});
