const
    express = require("express"),
    router = express.Router();

router.route('/users')
    .get((req, res) => {
        console.log(req, res)
        res.status(200).type('text/plain');
        res.render('users', { title: 'Users' });
    })
    .post((req, res) => {
        res.status(200).type('text/plain');
        res.send('Create user');
    })
    .put((req, res) => {
        res.status(200).type('text/plain');
        res.send('Update user');
    })
    .delete((req, res) => {
        res.status(200).type('text/plain');
        res.send('Delete user');
    });

module.exports = router;