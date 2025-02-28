export default function authenticateUser(req, res, next) {
    if (req.method !== 'GET') {
        req.isMe = req.user.id === req.params.id;
        if (!req.isMe && !req.user.isAdmin) {
            return res.status(403).send({message: 'Access denied'})
        }
    }
    next();
}