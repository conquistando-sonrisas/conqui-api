/// <reference path="../index.d.ts" />

import 'dotenv/config'
import express from 'express';
import helmet from 'helmet'
import cors from 'cors';
import donacionesRouter from './routes/donacionesRoutes';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import limiter from './config/rateLimiter';


const app = express();

app.set('trust proxy', 1)

app.use(limiter)
app.use(morgan('combined'));
app.use(cors())
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/donaciones', donacionesRouter);
app.use(errorHandler);

export { app }