const express = require('express');
const router = express.Router();
const {
    storingCredentialsInDb,
    credentialVerification
} = require('../controllers/logic');

router
    .route('/signup')
    .post(storingCredentialsInDb);

router
    .route('/signin')
    .post(credentialVerification)

module.exports = router;

