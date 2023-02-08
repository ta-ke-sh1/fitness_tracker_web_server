const functions = require("firebase-functions");
const express = require("express");
const app = express();
const reportController = require("./controllers/reportController");

app.use(express.static(__dirname + "/public"));

app.use("/report", reportController);

app.get('/', (req, res) => {
    console.log('Hello')
})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running! " + PORT);