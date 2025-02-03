import express from "express";
import { models } from "../config/database.js";
import ImageServes from "../serves/imageServes.js";
import ImageView from "../views/ImageView.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import authenticateImage from "../middlewares/authenticateImage.js";
const router = express.Router();
import {upload} from "../config/database.js";
import path from "path";
import { fileURLToPath } from 'url';

router.route('/:id')
    .get(ImageView.get)
    .delete(ImageView.delete)
    .patch(ImageView.update)

router.route('/')
    .get(ImageView.getAll)
    .post(upload.single('file'), ImageView.create);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/photo/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);

    res.sendFile(filepath, (err) => {
        if (err) {
            res.status(404).send('Файл не найден');
        }
    });
});



export default router;