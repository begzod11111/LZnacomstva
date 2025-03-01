import express from "express";
import CountryView from "../views/CountryView.js";
import {countryFileMiddleware} from "../middlewares/countryMiddleware.js";
import {upload} from "../config/database.js";

const countryRouter = express.Router();
//
countryRouter.route("/")
    .post(CountryView.createCountry)
    .get(CountryView.getAllCountries);

countryRouter.route("/:id")
    .get(CountryView.getCountry)
    .patch(
        countryFileMiddleware,
        upload.single('file'),
        CountryView.updateCountry
    )
    .delete(CountryView.deleteCountry);



export default countryRouter;
