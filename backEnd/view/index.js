const express = require('express');
const app = express();
const { connectDb } = require('../config/connectDb');
const router = require('../routes/routes');

const PORT = 3002;

connectDb('mongodb://localhost:27017/youtube-app-1');
app.use(express.json());
app.use('', router);

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});

