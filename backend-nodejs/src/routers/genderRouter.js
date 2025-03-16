import express from 'express';
const router = express.Router();
import { models } from '../config/database.js';
import GenderServes from "../serves/genderServes.js";
import {Model as genderServes} from "sequelize";

router.route(`/(:slug)?`)
    .get(async (req, res) => {
        if (req.params.slug) {
            const gender = await GenderServes.get(req.params.slug);
            res.status(200).json(gender)
        }
        else {
            const genders = await GenderServes.getAll();
            res.status(200).json(genders);
        }
    })
    .post(async (req, res) => {
        try {
            const gender = await GenderServes.create(req.body.name);
            res.status(201).json(gender);
        } catch (err) {
            res.status(400).json({ message: 'Error creating gender', error: err.message });
        }
    })
    .patch(async (req, res) => {
        if (req.params.slug) {
            const result = await GenderServes.update(req.params.slug, req.body.name);
            if (result.error) {
                res.status(400).json({ message: 'Error updating', error: result.error });
            }
            res.status(200).send(result);
        } else res.status(400).send('gender not found');
    })
    .delete(async (req, res) => {
        const result = await GenderServes.delete(req.params.slug);
        if (result.error){
            res.status(400).json({message: 'Error deleting', error: result.error});
        }
        res.status(200).send(result);
    });

export default router;
