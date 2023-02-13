
const express = require("express");
const ClassifyService = require("../services/classifyService");
const Pedometer = require('../services/pedometerService');
const router = express.Router();

router.get("/", async (req, res) => {
    console.log('Hello');
    const xAxis = Pedometer.loadClassified('./classifiedData/classified.txt')
    let stepCount = Pedometer.stepCounting(xAxis)
    res.send({
        date: '2023/02/09',
        steps: stepCount
    });
});

router.post("/upload/hour", async (req, res) => {
    ClassifyService.classify();
    const xAxis = Pedometer.loadClassified('./classifiedData/classified.txt')
    let stepCount = Pedometer.stepCounting(xAxis)
    res.send({
        date: '2023/02/09',
        steps: stepCount
    });
});

router.post("/upload/session", async (req, res) => {
    ClassifyService.classify();
    const xAxis = Pedometer.loadClassified('./classifiedData/classified.txt')
    let stepCount = Pedometer.stepCounting(xAxis)
    res.send({
        date: '2023/02/09',
        steps: stepCount
    });
});


module.exports = router;