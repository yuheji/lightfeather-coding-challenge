const { body, validationResult } = require('express-validator')

exports.postSubmit = function (req, res) {
    const body = req.body;
    console.log(body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.send(body);
};

exports.validatePostSubmit = [
        body('firstName', 'firstName does\'t exist').exists(),
        body('lastName', 'lastName doesn\'t exist').exists(),
        body('supervisorId', 'No supervisorId provided').exists(),
        body('email', 'Invalid email').optional().isEmail(),
        body('phoneNumber').optional().isInt()
];