import user from '../models/user.js';
import gender from "../models/gender.js";
import GoalMeeting from "../models/goalmeeting.js";
import image from "../models/image.js";
import country from "../models/country.js";
import mongoose from "mongoose";
import multer from "multer";
import path, {dirname} from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import Busboy from "busboy";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let {referenceModel, referenceId} = req.body;
        const dir = `uploads/${referenceModel}/${referenceId}`;

        // Проверка существования директории и создание, если она не существует
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir); // Папка для загрузки файлов
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Имя файла
    }
});


export const upload = multer({ storage: storage });


(async () => {
    await mongoose.connect('mongodb+srv://begzod:begzod0426@begzod.5alev.mongodb.net/?retryWrites=true&w=majority&appName=begzod',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
      console.error(err);
  });
})();



export const secretKey = 'begzod0426'
export const models = {
    user,
    gender,
    GoalMeeting,
    image,
    country,
};

