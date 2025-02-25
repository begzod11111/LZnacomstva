// src/middlewares/formDataMiddleware.js
// src/middlewares/formDataMiddleware.js
import Busboy from "busboy";
import multer from "multer";

export default async function formDataMiddleware(req, res, next) {
    if (req.method === 'POST' && req.is('multipart/form-data')) {
        const busboy = new Busboy({ headers: req.headers });
        req.body = {};
        req.file = null;

        busboy.on('field', (fieldname, val) => {
            req.body[fieldname] = val;
        });


        busboy.on('finish', () => {
            console.log(req.body); // Теперь req.body будет заполнен
            next();
        });

        req.pipe(busboy);
    } else {
        next();
    }
}

export function processRequestData(req, res, next) {
    // Используем multer в режиме "none" для извлечения текстовых полей формы
    const upload = multer().fields([
        { name: 'file', maxCount: 1 },
        { name: 'referenceModel', maxCount: 1 },
        { name: 'referenceId', maxCount: 1 }
    ]);

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to process form data' , err});
        }

        // Данные из формы доступны в req.body
        const { referenceModel, referenceId } = req.body;

        // Проверяем, что обязательные поля присутствуют
        if (!referenceModel || !referenceId) {
            return res.status(400).json({ message: 'Missing referenceModel or referenceId' });
        }

        // Обрабатываем данные (например, добавляем префикс к referenceModel)
        req.processedData = {
            referenceModel: `processed_${referenceModel}`,
            referenceId,
            timestamp: Date.now() // Добавляем временную метку
        };

        // Передаем управление следующему middleware
        next();
    });
}