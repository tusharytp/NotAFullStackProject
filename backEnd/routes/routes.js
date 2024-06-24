const express = require('express');
const router = express.Router();
const {
    storingCredentialsInDb,
    credentialVerification,
    getAllData,
    postData,
    deleteData,
    putData
} = require('../controllers/logic');

router
    .route('/signup')
    .post(storingCredentialsInDb);

router
    .route('/signin')
    .post(credentialVerification)

router
    .route('/data')
    .get(getAllData)
    .post(postData)
router
    .put('/data/:id', putData)
    .delete('/data/:id', deleteData)
module.exports = router;

