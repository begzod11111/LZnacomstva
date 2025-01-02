import express from 'express';
import routes from './src/routers/index.js'
import User from "./src/models/user.js";

import mongoose from 'mongoose';
const app = express();


const host = '127.0.0.1';
const port = 7000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);


app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});