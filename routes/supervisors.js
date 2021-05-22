const express = require('express');
const router = express.Router();

const supervisorsController = require('../controllers/supervisors');

router.get('/', supervisorsController.getSupervisors);

module.exports = router;
