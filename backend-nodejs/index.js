import express from 'express';
import routes from './src/routers/index.js'
import User from "./src/models/user.js";

import mongoose from 'mongoose';
import authenticateUser from "./src/middlewares/authenticateUser.js";
import authenticateToken from "./src/middlewares/authenticateToken.js";
import adminRouters from "./src/routers/adminRouters.js";
import authRouter from "./src/routers/jwtRouter.js";
const app = express();


const host = '127.0.0.1';
const port = 7000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter)
app.use(authenticateToken);
app.use('/api', routes);
app.use('/admin', adminRouters)

app.post('/test/:id', authenticateUser, (req, res) => {
    res.json({message: 'Test', data: req.params});
});
app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});
