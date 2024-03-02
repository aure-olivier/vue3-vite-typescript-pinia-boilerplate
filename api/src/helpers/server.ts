// Helpers
import http from 'http';
import * as path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addControllers } from '../api';
import { Logger } from './logger';
// import conf from './conf';

const app = express();

// Constants
const logger = new Logger('/server.ts');

export const server = http.createServer(app);

app.use((req, res, next) => {
  logger.debug(`-> "${req.originalUrl}"`);
  // if (req.originalUrl === '/my-secure-route') {
  //   next();
  // } else {
  next();
  // }
});

app.use(express.static(path.resolve(__dirname, '../ui/')))

const corsOptions = {
  origin: true
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.set('trust proxy', true);

// Add /api controllers
addControllers('api', app);
