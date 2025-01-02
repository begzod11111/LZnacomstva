import mongoose from "mongoose";
import Country from "../models/country.js";

export default class CountryServes {
    static create = async (date) => {
        try {
            const result = await Country({
                name: date.name,
                flag: date.flag
            }).save();
            return { massage: "Country created successfully", result };
        } catch (err) {
            return { error: err.message };
        }
    }

    static getAll = async () => {
        try {
            const result = await Country.find(undefined, undefined, undefined);
            return result;
        } catch (err) {
            return { error: err.message };
        }
    }
}