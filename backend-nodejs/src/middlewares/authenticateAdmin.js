

export default function authenticateAdmin (req, res, next) {
    console.log(req.user)
    if (!req.user.isAdmin){
         return res.status(403).send({message: 'Access denied'})
    }
    next()
}

