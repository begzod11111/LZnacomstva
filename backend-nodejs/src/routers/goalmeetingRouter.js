import express from "express";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";
import goalMeetingServes from "../serves/goalmeetingServes.js";

const router = express.Router();


router.route(`/`)
    .get(async (req, res) => {
        const result = await goalMeetingServes.getAll();
        if (result.error) {
            res.status(400).json({message: 'Error getting goal meetings', error: result.error.message});
        } else {
            res.status(200).json({message: 'Goal meetings', goalMeetings: result.result});
        }
    })
    .post(async (req, res) => {
        const result = await goalMeetingServes.create(req.body.name);
        if (result.error) {
            res.status(400).json({message: 'Error creating goal meeting', error: result.error.message});
        } else {
            res.status(201).json({message: 'Goal meeting created', goalMeeting: result.doc});
        }
    }, authenticateAdmin)
    .patch((req, res) => {
        const result = goalMeetingServes.update(req.body.id, req.body.name);
        if (result.error) {
            res.status(400).json({message: 'Error updating goal meeting', error: result.error.message});
        } else {
            res.status(200).json({message: 'Goal meeting updated', goalMeeting: result.doc});
        }
    }, authenticateAdmin)
    .delete(async (req, res) => {
        const result = await goalMeetingServes.delete(req.body.id);
        if (result.error) {
            res.status(400).json({message: 'Error deleting goal meeting', error: result.error.message});
        } else {
            res.status(200).json({message: 'Goal meeting deleted'});
        }
    }, authenticateAdmin);


export default router;