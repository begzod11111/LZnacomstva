import {models} from "../config/database.js";
import Image from "../models/image.js";
import fs from "fs";
import path from "path";
import {__dirname} from "../../uploads/path.js";

export default class ImageServes {
    constructor(req) {
        this.req = req;
    }

    static async get(id) {
        try {
            const image = await Image.findById(id);
            return {image, error: null};
        } catch (error) {
            return {error: error.message};
        }
    }

    static getImageFile = async (id) => {
        try {
            const image = await Image.findById(id).select('file');
            if (!image) {
                return {error: 'image not found'};
            }
            return {image, error: null};
        } catch (e) {
            return {error: e.message};
        }
    }

    static async getAll() {
        try {
            const images = await Image.find();
            return {images, error: null};
        } catch (error) {
            return {error: error.message};
        }
    }

    static async create(data) {
        try {
            const doc = new Image(data)
            const image = await doc.save();
            return {image, message: 'image in created', error: null};
        } catch (e) {
            return {error: e.message};
        }
    }

    static async update(id, data) {
        try {
          const image = await models.image.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
          });
          return {message: 'image updated', image, error: null};
        } catch (e) {return {error: e.message}}
    }

    static async delete(id) {
        try {
            const image = await Image.findByIdAndDelete(id);
            if (!image) {
                return {error: 'image not found'};
            }
            return {message: 'image is deleted', image, error: null};
        } catch (e) {return {error: e.message}}

    }

    static async clear() {
        try {
            const images = await models.image.deleteMany();
            return {message: 'images are deleted', images, error: null};
        } catch (e) {return {error: e.message}}
    }
}