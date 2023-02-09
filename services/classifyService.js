const fs = require('fs')
const tf = require('@tensorflow/tfjs-node');

class ClassifyService {

    constructor (arg) { }

    static async classify() {
        const model = await tf.loadLayersModel('http://localhost:5000/model.json');
        var data = this.readDataset('./dataset/ClassificationData.txt');
        var processedData = this.convertToInput(data, 100, 2);
        console.log(data.length)
        console.log(processedData.length)
        const prediction = model.predict(tf.tensor3d(processedData)).arraySync();
        let result = this.getResult(prediction);
        this.relabelData(data, result, 100);
    }

    static relabelData(original, predicted, time_steps = 1) {
        var Xs = [];
        for (let i = 0; i < original.length - time_steps; i++) {
            var row = [];
            for (let j = 0; j < original[0].length; j++) {
                row.push(original[i][j]);
            }
            row.push(predicted[Math.round(i / 2)]);
            Xs.push(row);
        }
        console.log(Xs)
        var file = fs.createWriteStream('classifiedData/classified.txt');
        Xs.forEach(function (v) { file.write(v.join('\t') + '\n'); });
        file.end();
    }

    static getResult(predictedDataset) {
        var result = [];
        predictedDataset.forEach((prediction) => {
            result.push(labels[prediction.indexOf(Math.max(...prediction))]);
        })
        return result;
    }

    static readDataset(filePath) {
        var text = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
        var res = [];
        text.forEach((e) => {
            var row = [];
            e.split('\t').forEach((num) => {
                row.push(parseFloat(num))
            })
            res.push(row)
        })
        return res;
    }

    static convertToInput(X, time_steps = 1, step = 1) {
        var Xs = [];
        for (let i = 0; i < X.length - time_steps; i += step) {
            var row = [];
            for (let k = 0; k < time_steps; k++) {
                let frame = [];
                for (let j = 0; j < X[0].length - 1; j++) {
                    frame.push(X[i + k][j]);
                }
                row.push(frame);
            }
            Xs.push(row);
        }
        return Xs;
    }
}

const labels = {
    0: 'Lying',
    1: 'Running',
    2: 'Standing',
    3: 'Walking',
}

module.exports = ClassifyService;