const fs = require('fs')
const lowPassFilter = require('low-pass-filter').lowPassFilter
class Pedometer {
    constructor (args) { }

    static stepCounting(data) {
        var filtered = this.lowPass(data, .001, this.rcByFrequency(10));
        let peakCount = 0;
        for (let i = 1; i < filtered.length - 1; i++) {
            if (filtered[i - 1] < filtered[i] && filtered[i + 1] < filtered[i]) {
                peakCount++;
            }
        }
        return Math.round(peakCount / 2);
    }

    static lowPass(samples, dt, rc) {
        var y = [],
            alpha = dt / (rc + dt),
            i;

        y[0] = alpha * samples[0];
        for (i = 1; i < samples.length; i++) {
            y[i] = parseFloat((alpha * samples[i] + (1 - alpha) * y[i - 1]).toFixed(3));
        }
        return y;
    }

    static rcByFrequency(f) {
        return 1 / (f * 2 * Math.PI);
    }

    static loadClassified(filePath) {
        var text = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
        var res = [];
        text.forEach((e) => {
            var row = [];
            if (e.includes('Walking') || e.includes('Running')) {
                res.push(e.split('\t')[0])
            }
        })
        return res.slice(0, -1);
    }
}

module.exports = Pedometer;