const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    console.log('Hello');
});

module.exports = router;