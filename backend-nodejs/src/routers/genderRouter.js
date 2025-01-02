import express from 'express';
const router = express.Router();
import { models } from '../config/database.js';
import GenderServes from "../serves/genderServes.js";

router.route(`/(:slug)?`)
    .all((req, res, next) => {
        console.log('Someone made a request to', req.path);
        next();
    })
    .get(async (req, res) => {
        const genderServes = new GenderServes(req);
        if (req.params.slug) {
            const gender = await genderServes.get();
            console.log(gender)
            res.status(200).json(gender)
        }
        else {
            const genders = await GenderServes.getAll();
            res.status(200).json(genders);
        }
    })
    .post(async (req, res) => {
        try {
            const genderServes = new GenderServes(req.body);
            const gender = await genderServes.create();
            res.status(201).json(gender);
        } catch (err) {
            res.status(400).json({ message: 'Error creating gender', error: err.message });
        }
    })
    .put((req, res) => {
        res.status(200).send('PUT request to the homepage');
    })
    .delete(async (req, res) => {
        const genderServes = new GenderServes(req);
        const gender = await genderServes.delete();
        res.status(200).send('DELETE request to the homepage');
    });

export default router;