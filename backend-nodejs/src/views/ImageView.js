import ImageServes from "../serves/imageServes.js";


export default class ImageView {
    static async getAll(req, res) {
        try {
            const result = await ImageServes.getAll();
            if (result.error) {
                res.status(400).json({message: 'Error getting images', error: result.error});
        } else res.status(200).json({images: result.images});
        } catch (e) { return { error: e.message }}
    }
    static async delete(req, res) {
        try {
            const result = await ImageServes.delete(req.params.id);
            console.log(result)
            if (result.error) {
                res.status(400).json({message: 'Error deleting image', error: result.error});
            } else res.status(200).json({message: 'Image deleted', image: result.image});
        } catch (e) {
            return {error: e.message}
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

        try {
            const result = await ImageServes.create({...req.body, userId: req.user._id});
            if (result.error) {
                res.status(400).json({message: 'Error creating image', error: result.error});
            } else {
                res.status(201).json({message: 'Image created', image: result.image});
            }
        } catch (e) { return { error: e.message }}
    }

    static async update(req, res) {
        try {
            const result = await ImageServes.update(req.params.id, req.body);
            if (result.error) {
                res.status(400).json({message: 'Error updating image', error: result.error});
            } else {
                res.status(200).json({message: 'Image updated', image: result.image});
            }
        } catch (e) { return { error: e.message }}
    }
}