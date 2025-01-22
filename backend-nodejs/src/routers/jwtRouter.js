import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import {models} from '../config/database.js';
import UserViews from "../views/UserViews.js";

router.route('/login')
    .post(UserViews.login);


export default router;