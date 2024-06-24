const bc = require('bcryptjs');
const { userCredentialsModel, userModel } = require('../models/model');

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

async function getAllData(req, res) {
    try {
        const allUsers = await userModel.find({});
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', err });
    }
}

async function postData(req, res) {
    const { first_name, last_name, email, gender, job_title } = req.body;
    if (!first_name || !last_name || !email || !gender || !job_title) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Get the next available ID for the new user
        const count = await userModel.countDocuments({});
        const id = count + 1;

        const newUser = new userModel({
            id,
            first_name,
            last_name,
            email,
            gender,
            job_title
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', err });
    }
}

async function putData(req, res) {
    const id = req.params.id;
    const { first_name, last_name, email, gender, job_title } = req.body;

    if (!first_name || !last_name || !email || !gender || !job_title) {
        return res.status(400).json({ msg: "All fields are required." });
    }
    try {
        // Find the user by ID and update
        const updatedUser = await userModel.findOneAndUpdate(
            { id }, // Find user by ID
            { $set: { first_name, last_name, email, gender, job_title } }, // Set new data
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', err });
    }
}

async function deleteData(req, res) {
    const id = req.params.id;

    try {
        // Find the user by ID and update
        const updatedUser = await userModel.findOneAndDelete({ id: id });

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error Deleting user', err });
    }
}
module.exports = {
    storingCredentialsInDb,
    credentialVerification,
    getAllData,
    postData,
    putData,
    deleteData
};
