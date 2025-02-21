import express from "express";
import CountryView from "../views/CountryView.js";
import {upload} from "../config/database.js";

const countryRouter = express.Router();

countryRouter.route("/")
    .post(upload.single('file'), CountryView.createCountry)
    .get(CountryView.getAllCountries);

countryRouter.route("/:id")
    .get(CountryView.getCountry)
    .patch(CountryView.updateCountry)
    .delete(CountryView.deleteCountry);


export default countryRouter;
