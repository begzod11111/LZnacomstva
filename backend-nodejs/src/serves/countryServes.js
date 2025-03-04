import Country from "../models/country.js";
import {models} from "../config/database.js";

export default class CountryServes {
    static create = async (date) => {
        try {
            const doc = new models.country(date);
            await doc.save();
            return { massage: "Country created successfully", country: doc, error: null };
        } catch (err) {
            return { error: err.message };
        }
    }
    static getAll = async () => {
        try {
            const res = await models.country.find(undefined, undefined, undefined).populate({
                path: 'image',
                select: 'url _id',
            })
            return res.map((country) => {
                return {
                    id: country._id,
                    name: country.name,
                    slug: country.slug,
                    image: country.get_url_media(),
                }
            });
        } catch (err) {
            return { error: err.message };
        }
    }

    static get = async (id) => {
        try {
            const res = await models.country.findById(id);
            return { massage: "Country found successfully", doc: res, error: null };
        } catch (err) {
            return { error: err.message };
        }
    }


    static getByName = async (name) => {
        try {
            const res = await models.country.findOne({name});
            return { massage: "Country found successfully", doc: res, error: null };
        } catch (err) {
            return { error: err.message };
        }
    }

    static update = async (id, date) => {
        try {
            const res = await models.country.findByIdAndUpdate(id, date, {new: true});
            return { massage: "Country updated successfully", res, error: null };
        } catch (err) {
            return { error: err.message };
        }

    }

    static delete = async (id) => {
        try {
            const res = await models.country.findByIdAndDelete(id);
            if (!res) {
                return { error: 'Country not found' };
            }
            return { massage: "Country deleted successfully", doc: res, error: null };
        } catch (err) {
            return { error: err.message };
        }
    }
}