import express from "express";
import {models, upload} from "../config/database.js";
import ImageServes from "../serves/imageServes.js";
import ImageView from "../views/ImageView.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import imageMiddleware  from "../middlewares/imageMiddlewares.js";
import {__dirname} from "../../uploads/path.js";
import path, {dirname} from "path";
import { fileURLToPath } from 'url';
import {getUploadDirMiddleware} from "../middlewares/imageMiddlewares.js";
import formDataMiddleware, {processRequestData} from "../middlewares/formDataMiddleware.js";

const router = express.Router();

router.route('/')
    .get(ImageView.getAll)
    .post(upload.single('file'), imageMiddleware, ImageView.create)
    .delete(async (req, res) => {
        const images = await ImageServes.clear();
        res.status(200).json({message: 'images deleted'});
    });


router.route('/:id')
    .get(ImageView.get)
    .delete(ImageView.delete)
    .patch(upload.single('file'), ImageView.update)



router.get('/photo/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, `avatars/${req.user.id}`, filename);
    res.sendFile(filepath, (err) => {
        if (err) {
            res.status(404).send('Файл не найден');
        }
    });
});



export default router;