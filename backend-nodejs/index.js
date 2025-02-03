import express from 'express';
import routes from './src/routers/index.js'
import User from "./src/models/user.js";
import cors from 'cors';
import mongoose from 'mongoose';
import authenticateUser from "./src/middlewares/authenticateUser.js";
import authenticateToken from "./src/middlewares/authenticateToken.js";
import adminRouters from "./src/routers/adminRouters.js";
import authRouter from "./src/routers/jwtRouter.js";
import {upload} from "./src/config/database.js";
import {details} from "./src/config/constants.js";
import {fileURLToPath} from "url";
import { dirname } from 'path';



const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Разрешить только этот источник
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    credentials: true // Разрешить отправку куки
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(`${__dirname}/uploads`));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter)
app.use(authenticateToken);
app.use('/api', routes);
app.use('/admin', adminRouters)


app.post('/upload', upload.single('url'), (req, res) => {
    res.send({
        message: 'success',
        file: req.file
    });
});



app.listen(details.port, details.host, function () {
    console.log(`Server listens ${details.siteUrl}`);
});