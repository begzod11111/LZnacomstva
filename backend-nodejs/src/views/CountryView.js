import express from 'express';
import CountryServes from '../serves/countryServes.js';
import {DirCountry, getPath} from "../config/constants.js";
import path from "path";

export default class CountryView {
    static async createCountry(req, res) {
        const data = {
            name: req.body.name,
            flag: getPath(req.file.path),
            file: req.file
        }
        const country = await CountryServes.create(data);
        res.status(201).json(country);
    }
    static async getAllCountries(req, res) {
        const countries = await CountryServes.getAll();
        res.status(200).json(countries);
    }

    static async getCountry(req, res) {
        const country = await CountryServes.get(req.params.id);
        res.status(200).json(country);
    }

    static async updateCountry(req, res) {
        const oldFile = req.oldFileName;
        if (req.file) {
            req.body.flag = getPath(req.file.path);
            req.body.file = req.file;
        }
        const country = await CountryServes.update(req.params.id, req.body);
        if (country.error) {
            return res.status(400).json({message: 'Error updating country', error: country.error});
        }
        const dir = new DirCountry(country.res.name);
        await dir.deleteFile(oldFile);


        res.status(200).json({
            message: 'Country updated',
            country: country.res
        });
    }
    static async deleteCountry(req, res) {
        const country = await CountryServes.delete(req.params.id);
        if (country.error) {
            return res.status(400).json({message: 'Error deleting country', error: country.error});
        }
        const dir = new DirCountry(country.doc.name);
        await dir.delete();
        res.status(200).json({message: 'Country deleted', country: country.country});
    }
}

