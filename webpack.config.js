const path = require("node:path")

module.exports={
    entry: "./src/server/server.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
        clean: true
    },
    resolve: {
        extensions: ['.mts', '.mjs', '.ts', '.js'],
    },
    mode: "production",
    devtool: 'source-map',
    target: "node",
    externals: {
        "pg-native": "pg-native"
    }
}