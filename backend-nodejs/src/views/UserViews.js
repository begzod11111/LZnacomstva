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
        if (!req.params.id) return res.status(400).json({message: 'No user id provided'});
        const result = await userServes.remove(req.params.id);
        if (result.error) {
            res.status(400).json({message: 'Error removing user', error: result.error});
        } else {
            res.status(200).json({message: 'User removed', user: result.user});
        }
    }
    static async getAll(req, res) {
        if (req.query) {
            console.log(req.query)
            const result = await userServes.getUsersWithQuery(req.query);
            if (result.error) {
                return res.status(400).json({message: 'Error getting users', error: result.error});
            } else return res.status(200).json({users: result.users});}
        const result = await userServes.getUsersWithPhotos();
        if (result.error) {
            res.status(400).json({message: 'Error getting users', error: result.error});
        } else res.status(200).json({users: result});
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