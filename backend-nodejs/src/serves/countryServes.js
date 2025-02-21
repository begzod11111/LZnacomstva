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
            return await models.country.find(undefined, undefined, undefined);
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



    static update = async (id, name) => {
        try {
            const res = await models.country.findByIdAndUpdate(id, {name}, {new: true});
            return { massage: "Country updated successfully", res, error: null };
        } catch (err) {
            return { error: err.message };
        }

    }

    static delete = async (id) => {
        try {
            const res = await models.country.findByIdAndDelete(id);
            return { massage: "Country deleted successfully", doc: res, error: null };
        } catch (err) {
            return { error: err.message };
        }
    }
}