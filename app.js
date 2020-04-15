import express from 'express';
import bodyParser from 'body-parser';
import { corsDisable } from './src/utils/cors';
import { connectMongo } from './src/utils/dbConnect';
import { createLink } from './src/controllers/link/createLink';
import { getLink } from './src/controllers/link/getLink';
import { getStats } from './src/controllers/link/getStats.js';

const app = express();
app.use(bodyParser.json());

connectMongo();
if (process.env.NODE_ENV === 'develop') {
  corsDisable(app);
}

// kube healthcheck
app.get('/', (req, res) => {
  res.send({
    message: 'ok',
    version: process.env.npm_package_version
  });
});

app.post('/link', createLink);
app.post('/stats', getStats);
app.get('/\\w{5,9}', getLink);
app.get('/*', (req, res) => {
  res.status(404).send({
    message: 'not found'
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message
  });
});

// start
app.listen(process.env.PORT || 3000, () => {
  console.log('i am started for port = 3000');
});

export default app;
