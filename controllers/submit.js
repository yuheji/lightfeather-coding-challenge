const { body, validationResult } = require('express-validator')
const supervisorsController = require('../controllers/supervisors');

let submits = [];

function postSubmit(req, res) {
    const body = req.body;
    console.log(body);

    // Compare supervisor id to supervisors in database
    supervisorsController.getSupervisorData((result) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const supervisorId = body.supervisorId;

        if (!(result.some(supervisor => supervisor.id === supervisorId))) {
            return res.status(422).json({ error: 'Supervisor not found'});
        }

        const supervisor = result.find(({id}) => id === supervisorId);
        const supervisorPhone = supervisor.phone;
        body.supervisorPhone = supervisorPhone;
        submits.push(body);
        console.log(submits);
        res.status(200).json(body);
    });
}

function getSubmit(req, res) {
    res.send(submits);
}

function getSubmitWithSupervisorId(req, res) {
    let supervisorId = req.params.supervisorId;
    let returnArray = [];
    submits.forEach(submit => {
        if (submit.supervisorId == supervisorId) {
            returnArray.push(submit);
        }
    });

    res.send(returnArray);
}

/**
 * Express validator for required post parameters
 */
const validatePostSubmit = [
        body('firstName', 'No firstName provided').exists().notEmpty(),
        body('lastName', 'No lastName provided').exists().notEmpty(),
        body('supervisorId', 'No supervisorId provided').exists().notEmpty(),
        body('email', 'Invalid email').optional().isEmail(),
        body('phoneNumber').optional().isInt()
];

module.exports = {
    postSubmit: postSubmit,
    getSubmit: getSubmit,
    getSubmitWithSupervisorId: getSubmitWithSupervisorId,
    validatePostSubmit: validatePostSubmit
};
