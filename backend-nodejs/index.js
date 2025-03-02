import express from 'express';
import routes from './src/routers/index.js'
import cors from 'cors';
import authenticateToken from "./src/middlewares/authenticateToken.js";
import adminRouters from "./src/routers/adminRouters.js";
import authRouter from "./src/routers/jwtRouter.js";
import {details} from "./src/config/constants.js";
import {fileURLToPath} from "url";
import { dirname } from 'path';
import bodyParser from 'body-parser';
import multer from "multer";
import fs from "fs";
import {models} from "./src/config/database.js";



const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Разрешить только этот источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    credentials: true // Разрешить отправку куки
};


export const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

// app.use(formidable());
// app.use(formDataMiddleware);
app.use(express.static(`${__dirname}/uploads`));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/auth', authRouter);


app.use(authenticateToken);
app.use('/api', routes);
app.use('/admin', adminRouters);



app.listen(details.port, details.host, function () {
    console.log(`Server listens ${details.siteUrl}`);
});