const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const userDataSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: false
    },
    first_name: {
        type: String,
        required: true,
        unique: false
    },
    last_name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        unique: false
    },
    job_title: {
        type: String,
        required: true
    }
})


const userModel = mongoose.model("users", userDataSchema);

const userCredentialsModel = mongoose.model('userCredentials', userSchema);

module.exports = {
    userCredentialsModel,
    userModel,
};
