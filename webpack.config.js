const path = require('path');

module.exports = {
    mode: 'development', 
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'output'), 
        filename: 'optim.js'
    }, 
    watch: true
}