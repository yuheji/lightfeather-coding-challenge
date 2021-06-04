const express = require('express');
const router = express.Router();

const submitController = require('../controllers/submit');

router.post('/', submitController.validatePostSubmit, submitController.postSubmit);
router.get('/', submitController.getSubmit);
router.get('/:supervisorId', submitController.getSubmitWithSupervisorId);

module.exports = router;