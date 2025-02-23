import ImageServes from "../serves/imageServes.js";
import path from "path";
import fs from "fs/promises";
import {__dirname} from "../../uploads/path.js";
import {clearDir, getAvatarPath, getPath} from "../config/constants.js";
import {DirAvatar} from "../config/constants.js";
import mongoose from "mongoose";




export default class ImageView {
    static async getAll(req, res) {
        try {
            const dirPath = getAvatarPath(req.user.id);
            const result = await ImageServes.getAll();
            if (result.error) {
                res.status(400).json({message: 'Error getting images', error: result.error});
        } else res.status(200).json({images: result.images});
        } catch (e) { return { error: e.message }}
    }

    static async delete(req, res) {
        try {
            const result = await ImageServes.delete(req.params.id);

            if (result.error) {
                return res.status(400).json({ message: 'Error deleting image', error: result.error });
            }

            const filename = result.image.file.filename;
            const dir = new DirAvatar(req.user.id);

            await dir.deleteFile(filename);
            await dir.deleteDirIfEmpty();

            res.status(200).json({ message: 'Image deleted', image: result.image });
        } catch (e) {
            res.status(400).json({ message: 'Error deleting image', error: e.message });
        }
    }

    static async get(req, res) {
        try {
            const result = await ImageServes.get(req.params.id);
            if (result.error) {
                res.status(400).json({message: 'Error getting image', error: result.error});
            } else res.status(200).json({image: result.image});
        } catch (e) { return { error: e.message }}
    }

    static async create(req, res) {

        res.status(200).json({message: 'Image created', file: req.body});
        // const data = {
        //     file: req.fields.file,
        //     url: getPath(req.fields.file.path),
        //     _referenceModel: req.fields.referenceModel,
        //     _referenceId: req.fields.referenceId,
        // }
        // try {
        //     const result = await ImageServes.create(data);
        //     if (result.error) {
        //         res.status(400).json({message: 'Error creating image', error: result.error});
        //     } else {
        //         res.status(201).json({message: 'Image created', image: result.image, file: req.file});
        //     }
        // } catch (e) {
        //     res.status(400).json({message: 'Error creating image', error: e.message});
        // }
    }

    static async update(req, res) {
        try {
            const dir = new DirAvatar(req.user.id);
            req.body.file = req.file;
            const oldImageFileName = await ImageServes.getImageFile(req.params.id);
            const result = await ImageServes.update(req.params.id, req.body);
            if (result.error || oldImageFileName.error) {
                res.status(400).json({message: 'Error updating image', error: result.error});
            } else {
                const filename = oldImageFileName.image.file.filename;
                await dir.deleteFile(filename);
                await dir.deleteDirIfEmpty();
                res.status(200).json({message: 'Image updated', image: result.image});
            }
        } catch (e) {res.status(400).json({message: 'Error updating image', error: e.message})}
    }

    static async clear(req, res) {
        try {
            const result = await ImageServes.clear();
            if (result.error) {
                res.status(400).json({message: 'Error clearing images', error: result.error});
            } else {
                res.status(200).json({message: 'Images cleared', images: result.images});
            }
        } catch (e) { return { error: e.message }}
    }
}