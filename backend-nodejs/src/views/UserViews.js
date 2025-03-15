import userServes from '../serves/userServes.js';
import JwtServes from "../serves/jwtServes.js";

export default class UserViews {
    static async login(req, res) {
        const result = await JwtServes.create(req.body);

        if (result.error) {
            res.status(400).json({message: 'Error logging in', error: result.error});
        } else {
            res.status(200).json({
                message: 'User logged in',
                token: result.token,
                payload: result.payload,
                data: result.data
            });
        }
    }
    static async create(req, res) {
        const result = await userServes.create(req.body);
        if (result.error) {
            res.status(400).json({
                message: 'Error creating user',
                error: result.error
            });
        } else {
            const token = await JwtServes.getToken(result.user);
            res.status(201).json({...result, token});
        }
    }
    static async remove(req, res) {

        if (!req.params.id) return res.status(400).json({message: 'No user id provided'});
        const result = await userServes.remove(req.params.id);
        if (result.error) {
            res.status(400).json({message: 'Error removing user', error: result.error});
        } else {
            res.status(200).json({message: 'User removed', user: result.user});
        }
    }
    static async getAll(req, res) {
        const result = await userServes.getUsersWithQuery(req.query);
        if (result.error) {
            res.status(400).json({message: 'Error getting users', error: result.error});
        } else res.status(200).json(result);
    }

    static async getById(req, res) {
        if (!req.params.id) return res.status(400).json({message: 'No user id provided'});
        const result = await userServes.get(req.params.id);
        if (result.error) {
            res.status(400).json({message: 'Error getting user', error: result.error});
        } else res.status(200).json({user: result.user});
    }


    static async update(req, res) {
        if (!req.params.id) return res.status(400).json({message: 'No user id provided'});
        const result = await userServes.update(req.params.id, req.body);
        if (result.error) {
            res.status(400).json({message: 'Error updating user', error: result.error});
        } else {
            res.status(200).json({message: 'User updated', user: result.user});
        }
    }
}