import GenderServes from "../serves/genderServes.js";


export default class GenderView {
    static async createGender(req, res) {
        const gender = await GenderServes.create(req.body);
        res.status(201).json(gender);
    }

    static async getAllCountries(req, res) {
        const countries = await GenderServes.getAll();
        res.status(200).json(countries);
    }
}
