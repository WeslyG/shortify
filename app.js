import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config';
import { corsDisable } from './src/utils/cors';
import { connectMongo } from './src/utils/dbConnect';
import { createLink } from './src/controllers/link/createLink';
import { getLink } from './src/controllers/link/getLink';
import { getStats } from './src/controllers/link/getStats.js';
import {version, name } from './package.json';


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
    version: version,
    name: name
  });
});

app.post('/link', createLink);
app.get('/stats', getStats);
app.get('/*', getLink);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message
  });
});

// start
app.listen(PORT, () => {
  console.log(`Started for port = ${PORT}`);
});

export default app;
