const functions = require("firebase-functions");
const express = require("express");
const app = express();
const reportController = require("./controllers/reportController");

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.use("/report", reportController);

app.get('/', (req, res) => {
    res.send('Hello world');
})

exports.app = functions.https.onRequest(app);