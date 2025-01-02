import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import {models} from '../config/database.js';
import UserViews from "../views/UserViews.js";

router.route('/(:id)?')
    .get(UserViews.get)
    .post(UserViews.create)
    .delete(UserViews.remove);

export default router;
