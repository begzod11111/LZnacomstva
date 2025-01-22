import Image from "../models/image.js";

export default async function authenticateImage(req, res, next) {
    if (req.method ===! 'GET') {
        try {
            const image = await Image.findById(req.params.id);
            req.isAuthor = req.user.id === image.userId.toString();

            if (!req.isAuthor && !req.user.isAdmin) {
                return res.status(403).json({message: 'Forbidden'});
            }

            if (req.isAuthor) {
                console.log('you are author');
            } else {
                console.log('You are admin');
            }

        } catch (e) {
            return res.status(400).json({
                message: 'Error finding image',
                error: e.message
            });
        }
    }
    next()
}

