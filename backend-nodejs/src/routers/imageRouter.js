import express from "express";
import { models } from "../config/database.js";
import ImageServes from "../serves/imageServes.js";
import ImageView from "../views/ImageView.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import authenticateImage from "../middlewares/authenticateImage.js";
const router = express.Router();

router.route('/:id')
    .get(ImageView.get)
    .delete(ImageView.delete)
    .patch(ImageView.update)

router.route('/')
    .get(ImageView.getAll)
    .post(ImageView.create)



export default router;