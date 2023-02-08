
const express = require("express");
const ClassifyService = require("../services/classifyService");
const router = express.Router();

router.get("/", async (req, res) => {
    console.log('Hello');
    ClassifyService.classify();
});

module.exports = router;