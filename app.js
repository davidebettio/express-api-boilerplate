import express from 'express';
import winston from 'winston';
import morgan from 'morgan';
import { hostname } from 'os';
import compression from 'compression';
import bodyParser from 'body-parser';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 'loopback');
  app.use(morgan('common'));
} else {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('/', (req, res) => {
  res.send({ welcome_to: 'my-api' });
});

const server = app.listen(8001, () => {
  const host = server.address().address;
  const port = server.address().port;

  winston.info(`HOSTNAME: ${hostname()}`);
  winston.info(`NODE_ENV: ${app.get('env')}`);
  winston.info(`app listening at http://${host}:${port}`);
});
