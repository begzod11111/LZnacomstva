import ImageServes from "../serves/imageServes.js";
import {Dir, getAvatarPath, getPath} from "../config/constants.js";




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
            const dir = new Dir(result.image._referenceModel, result.image._referenceId.toString());
            await dir.deleteFile(filename);
            await dir.deleteDirIfEmpty();
            console.log(dir)

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

        const data = {
            file: req.file,
            url: getPath(req.file.path),
            _referenceModel: req.body.referenceModel,
            _referenceId: req.body.referenceId,
            isMain: req.body.isMain || false
        }
        try {
            const result = await ImageServes.create(data);
            if (result.error) {
                res.status(400).json({message: 'Error creating image', error: result.error});
            } else {
                res.status(201).json({message: 'Image created', image: result.image, file: req.file});
            }
        } catch (e) {
            res.status(400).json({message: 'Error creating image', error: e.message});
        }
    }

    static async update(req, res) {
        try {
            req.body.file = req.file;
            const oldImageFileName = await ImageServes.getImageFile(req.params.id);
            const result = await ImageServes.update(req.params.id, req.body);
            console.log(result)
            const dir = new Dir(result.image._referenceModel, result.image._referenceId);
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