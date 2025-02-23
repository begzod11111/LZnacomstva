import Image from "../models/image.js";
import {models} from "../config/database.js";
import {getUploadPath} from "../config/constants.js";

export default function imageMiddleware(req, res, next) {
    if (req.body.referenceModel === 'User') {
        const isAuthor = req.user.id === req.body.referenceId;
        if (req.method === 'POST' || req.method === 'PATCH') {
            if (!isAuthor) {
                return res.status(403).json({message: 'Forbidden'});
            }
        } else if (req.method === 'DELETE') {
            if (!isAuthor && !req.user.isAdmin) {
                return res.status(403).json({message: 'Forbidden'});
            }
        }
    }

    // if (req.method ===! 'GET') {
    //     try {
    //         if (req.body.referenceModel === 'User') {
    //             req.isAuthor = req.user.id === req.body.referenceId;
    //             if (!req.isAuthor && !req.user.isAdmin) {
    //                 return res.status(403).json({message: 'Forbidden'});
    //             }
    //         } else {
    //             if (!req.user.isAdmin) {
    //                 return res.status(403).json({message: 'Forbidden'});
    //             }
    //         }
    //     } catch (e) {
    //         return res.status(400).json({
    //             message: 'Error finding image',
    //             error: e.message
    //         });
    //     }
    // }
    next();
}

export function getUploadDirMiddleware (req, res, next) {
    req.uploadDir = getUploadPath('avatars', req.user.id);
    next()
}