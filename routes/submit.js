const express = require('express');
const router = express.Router();

const submitController = require('../controllers/submit');

router.post('/', submitController.validatePostSubmit, submitController.postSubmit);

module.exports = router;