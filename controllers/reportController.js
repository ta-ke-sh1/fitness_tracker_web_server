const express = require("express");
const ClassifyService = require("../services/classifyService");
const Pedometer = require("../services/pedometerService");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../dataset/");
    },
    filename: function (req, file, cb) {
        var today = new Date();
        cb(null, file.fieldname + "-" + today.getTime() + ".txt");
    },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    console.log('Hello');
    const xAxis = Pedometer.loadClassified('./classifiedData/classified.txt')
    let stepCount = Pedometer.stepCounting(xAxis)
    res.send({
        date: '2023/02/09',
        steps: stepCount
    });
});

router.get("/hour", async (req, res) => {
    ClassifyService.classify();
    const xAxis = Pedometer.loadClassified('./classifiedData/classified.txt')
    let stepCount = Pedometer.stepCounting(xAxis)
    res.send({
        date: '2023/02/09',
        steps: stepCount
    });
});


router.post("/upload", upload.single("accel"), async (req, res) => {
    if (req.file) {
        res.send("File saved at: " + req.file.path);
    } else {
        res.send("No files attached");
    }
});

module.exports = router;
