/// <reference path="../index.d.ts" />

import 'dotenv/config'
import express from 'express';
import helmet from 'helmet'
import cors from 'cors';
import donacionesRouter from './routes/donacionesRoutes';
import morgan from 'morgan';
import logger from './config/logger';
import errorHandler from './middlewares/errorHandler';


const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/donaciones', donacionesRouter);
app.use(errorHandler);

export { app }