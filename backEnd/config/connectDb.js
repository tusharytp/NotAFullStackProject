const mongoose = require('mongoose');

async function connectDb(url) {
    try {
        await mongoose.connect(url);
        console.log("Connection has been established with the MongoDB");
    } catch (err) {
        console.log('ERROR OCCURRED', err);
    }
}

module.exports = {
    connectDb
};

