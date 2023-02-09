
const express = require("express");
const ClassifyService = require("../services/classifyService");
const Pedometer = require('../services/pedometerService');
const router = express.Router();

router.get("/", async (req, res) => {
    console.log('Hello');
    const classifiedData = Pedometer.loadClassified('./classifiedData/classified.txt')
    console.log(classifiedData[classifiedData.length - 1])
});

module.exports = router;