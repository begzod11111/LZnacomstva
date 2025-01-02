import express from 'express';
import CountryServes from '../serves/countryServes.js';

export default class CountryView {
    static async createCountry(req, res) {
        const country = await CountryServes.create(req.body);
        res.status(201).json(country);
    }

    static async getAllCountries(req, res) {
        const countries = await CountryServes.getAll();
        res.status(200).json(countries);
    }
}