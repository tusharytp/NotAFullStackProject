const bc = require('bcryptjs');
const { userCredentialsModel } = require('../models/model');

async function storingCredentialsInDb(req, res) {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try {
        const encryptedPassword = await bc.hash(password, 10);
        console.log('entered try block')
        const savedUser = await new userCredentialsModel({
            username: userName,
            email,
            password: encryptedPassword
        }).save();
        res.status(200).json({ msg: "Registered Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `ERROR OCCURRED ${err}` });
    }
}

async function credentialVerification(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userCredentialsModel.findOne({ email: email });
        if (user) {
            const isMatch = await bc.compare(password, user.password);
            if (isMatch) {
                res.status(200).json({ msg: 'Success' });
            } else {
                res.status(401).json({ msg: 'Invalid Email/Password' });
            }
        } else {
            res.status(401).json({ msg: 'Invalid Email/Password' });
        }
    } catch (err) {
        console.error('ERROR OCCURRED:', err);
        res.status(500).json({ msg: 'INTERNAL SERVER ERROR', error: err.message });
    }
}

module.exports = {
    storingCredentialsInDb,
    credentialVerification,
};
