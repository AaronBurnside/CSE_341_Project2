const express = require('express');
const router = express.Router();
const C1Controller = require('../controller/C1');

router.get('/', C1Controller.getAll);
router.get('/:id', C1Controller.getSingle);

module.exports = router;