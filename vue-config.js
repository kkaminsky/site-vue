module.exports = {
    devServer: {
        proxy: {
            '/dimas': {
                target: 'http://192.168.1.123:5000/',
                pathRewrite: {
                    '/dimas' : ''
                }
            }
        }
    }
};