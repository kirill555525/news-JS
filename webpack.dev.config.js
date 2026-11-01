module.exports = {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '/'
    },
    devServer: {
        port: 8080,
        hot: true,
        open: false
    }
};