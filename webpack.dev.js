const { merge } = require("webpack-merge")
const common = require('./webpack.common.js')
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    watch: true,
    externals: [nodeExternals()],
    plugins: [
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ['npm run server:dev'],
                blocking: false,
                parallel: true
            }
        })
    ],
})