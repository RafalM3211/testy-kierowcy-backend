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
        clean: true,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.mts', '.mjs', '.ts', '.js'],
    },
    target: "node",
    externals: {
        "pg-native": "pg-native"
    }
}