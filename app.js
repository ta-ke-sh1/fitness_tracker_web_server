
const express = require("express");
const app = express();
const reportController = require("./controllers/reportController");

app.use(express.static(__dirname + "/public"));

app.use("/report", reportController);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server is running! " + PORT);