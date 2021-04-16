import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import "@babel/polyfill";

import { database_uri } from './config';
import championRotation from './routes/championRotation';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use('/championRotation', championRotation);

/* Connect to MongoDB */
mongoose.connect(database_uri, {
    useCreateIndex: true,
    useFindAndModify: false, // flag needed to enable findOneAndUpdate
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/* Check if server is running */
app.get('/', (req, res) => {
    res.json('Server is running!');
});

/* Error Handlers */
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        title: err.title || "Uncaught Error",
        message: err.message,
    });
});

export default app;
