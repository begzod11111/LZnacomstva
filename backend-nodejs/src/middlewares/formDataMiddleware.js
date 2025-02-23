// src/middlewares/formDataMiddleware.js
// src/middlewares/formDataMiddleware.js
import Busboy from "busboy";

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