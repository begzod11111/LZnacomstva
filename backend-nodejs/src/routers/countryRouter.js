import express from "express";
import CountryView from "../views/CountryView.js";


const countryRouter = express.Router();

countryRouter.route("/")
    .post(CountryView.createCountry)
    .get(CountryView.getAllCountries);


export default countryRouter;