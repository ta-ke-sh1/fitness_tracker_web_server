const functions = require("firebase-functions");
const express = require("express");
const app = express();
const reportController = require("./controllers/reportController");
const path = require("path");

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(__dirname + "/classifier"))

app.use(express.json());

app.use("/report", reportController);

app.get('/', (req, res) => {
    res.send('Hello world');
})

exports.app = functions.https.onRequest(app);

// Local development
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running! " + PORT);