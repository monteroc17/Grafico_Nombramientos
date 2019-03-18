const path = require('path');

module.exports = {
    entry: {
        graphLogic:path.resolve(__dirname,"javascript/main.js")
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname,"bundle")
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: {loader:"babel-loader"}
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
}