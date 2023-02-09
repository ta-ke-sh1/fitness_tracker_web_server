const fs = require('fs')

class Pedometer {
    constructor (args) { }

    static stepCounting(data) {
        
    }

    static loadClassified(filePath) {
        var text = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
        var res = [];
        text.forEach((e) => {
            var row = [];
            if (e.includes('Walking') || e.includes('Running')) {
                e.split('\t').forEach((num) => {
                    if (isNaN(num)) {
                        row.push(num)
                    } else {
                        row.push(parseFloat(num))
                    }
                })
            }
            if (row.length > 0) {
                res.push(row)
            }

        })
        return res.slice(0, -1);
    }
}

module.exports = Pedometer;