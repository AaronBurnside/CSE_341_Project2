const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {res.send("Hello World");});

router.use('/collection1', require('./collection1'));
module.exports = router;