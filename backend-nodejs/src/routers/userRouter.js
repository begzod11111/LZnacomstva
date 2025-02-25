import express from 'express';
import User from '../models/user.js';
import {models} from '../config/database.js';
import UserViews from "../views/UserViews.js";
import authenticateUser from "../middlewares/authenticateUser.js";

const router = express.Router();


router.route('/')
    .get(UserViews.getAll)
    .post(UserViews.create);
router.route('/:id')
    .get(UserViews.getById)
    .patch(UserViews.update)
    .delete(UserViews.remove);








export default router;
