var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

module.exports = {
    loadData: loadData,
}
