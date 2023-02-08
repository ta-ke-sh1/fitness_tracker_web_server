const functions = require("firebase-functions");
const express = require("express");
const app = express();
const reportController = require("./controllers/reportController");

app.use(express.json());

app.use("/report", reportController);

app.get('/', (req, res) => {
    res.send('Hello world');
})

exports.app = functions.https.onRequest(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running! " + PORT);