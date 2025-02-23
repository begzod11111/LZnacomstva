import {models} from "../config/database.js";

async function countryUpdateMiddleware(req, res, next) {

    ```
    еше не реализовано
    ```
    return next();
}

async function countryFileMiddleware(req, res, next) {
    try {
        if (req.method === 'PATCH') {
            const country = await models.country.findById(req.params.id).select('name file');
            if (!country) {
                return res.status(404).json({message: 'Country not found'});
            }
            req.oldFileName = country.file.filename;
            req.uploadDir = `uploads/countries/${country.name}`;
        } else if (req.method === 'POST') {
            req.uploadDir = `uploads/countries/${req.body.name}`;
        }
        next();
    } catch (e) {
        res.status(400).json({message: 'Error getting country', error: e.message});
    }
}

export {
    countryUpdateMiddleware,
    countryFileMiddleware
};