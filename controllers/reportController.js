const tf = require('@tensorflow/tfjs');

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    console.log('Hello');
});

async function classify() {
    const model = await tf.loadLayersModel('./classifer/model.json');
    model.predict();
}

module.exports = router;