module.exports = {
    configureWebpack: {
        resolve: {
            // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
            extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql']
        },
        module: {
            rules: [ // fixes https://github.com/graphql/graphql-js/issues/1272
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                }
            ]
        }
    },
    devServer: {
        proxy: {
            '/dimas': {
                target: 'http://192.168.0.126:5000/',
                pathRewrite: {
                    '/dimas' : ''
                }
            }
        }
    }
};