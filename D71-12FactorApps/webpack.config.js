const path = require('path');

module.exports = {
    mode: 'production',
    entry: './server.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    target: 'node'
};