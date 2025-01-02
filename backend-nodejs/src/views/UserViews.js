import userServes from '../serves/userServes.js';

export default class UserViews {
    static async login(req, res) {
        const result = await userServes.login(req.body);
        if (result.error) {
            res.status(400).json({message: 'Error logging in', error: result.error});
        } else {
            res.status(200).json({message: 'User logged in', token: result.token});
        }
    }
    static async create(req, res) {
        const result = await userServes.create(req.body);
        if (result.error) {
            res.status(400).json({message: 'Error creating user', error: result.error});
        } else {
            res.status(201).json({message: 'User created', user: result.user});
        }
    }
    static async remove(req, res) {
        const result = await userServes.remove(req.params.id);
        if (result.error) {
            res.status(400).json({message: 'Error removing user', error: result.error});
        } else {
            res.status(200).json({message: 'User removed', user: result.user});
        }
    }
    static async get(req, res) {
        if (!req.params.id) {
            const result = await userServes.getAll();
            if (result.error) {
                return res.status(400).json({message: 'Error getting users', error: result.error});
            } else {
                return res.status(200).json({users: result.users});
            }
        }
        const result = await userServes.get(req.params.id);
        if (result.error) {
            res.status(400).json({message: 'Error getting user', error: result.error});
        } else {
            res.status(200).json({user: result.user});
        }
    }
}