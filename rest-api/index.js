const bodyParser = require('body-parser')
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoDb = require('./node-backend/model/Book');
require('./database/db');
const app = express();
const port = process.env.port || 5000;
app.use(cors());

const main = async () => {
    const data = new MongoDb();
    console.log("Connection Established");
}
main();

const bookRoute = require("./node-backend/routes/book.route");
const { nextTick } = require('process');
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', bookRoute);
app.listen(port, () => {
    console.log("Listening on port 5000");
})

app.use((req, res, next) => {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});

app.use(function (err, req, res, next) {
    console.log(err.mesage , err.statusCode);
    console.log("this is the error", err.statusCode);
    if (!err.statusCode) err.status = 500;
    res.status(err.statusCode).send(err.message);
});
