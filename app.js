import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config';
import { corsDisable } from './src/utils/cors';
import { connectMongo } from './src/utils/dbConnect';
import { createLink } from './src/controllers/link/createLink';
import { getLink } from './src/controllers/link/getLink';
import { getStats } from './src/controllers/link/getStats.js';
import {version, name } from './package.json';

const NODE_ENV = process.env.NODE_ENV;
const app = express();
app.use(bodyParser.json());

connectMongo();
if (NODE_ENV === 'development') {
  corsDisable(app);
}

// kube healthcheck
app.get('/', (req, res) => {
  res.send({
    message: 'ok',
    version: version,
    name: name
  });
});

app.post('/links', createLink);
app.get('/stats/:link', getStats);
app.get('/*', getLink);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message
  });
});

// start
app.listen(PORT, () => {
  console.log(`App started in ${NODE_ENV} mode on port ${PORT}`);
});

export default app;
