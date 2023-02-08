
const tf = require('@tensorflow/tfjs');

class ClassifyService {

    constructor (arg) {
        console.log(arg);
    }

    static async classify() {
        console.log(__dirname)
        const model = await tf.loadLayersModel('http://localhost:5000/model.json');
        console.log(model.summary())
        // model.predict();
    }

    readDataset(filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(text => console.log(text));

    }

    convertData() {
        
    }
}

module.exports = ClassifyService;