module.exports = {
    // Configuration of the server bundle
    server: {
        // Port to listen
        port: 7778,

        // The middlewares
        middlewares: [
            // Deflate or Gzip compression
            '@deflate.middleware',
            '@gzip.middleware',

            // Serve static files
            '@static.middleware',

            // Serve the assets
            '@assets.middleware',

            // The template engine
            '@swig.middleware',

            // The router to handle URIs
            '@router.middleware'
        ]
    },

    // Configuration of the assets bundle
    assets: require('./assets'),

    // Configuration of the static bundle
    static: {
        // The directories to serve
        directories: [
            __dirname + '/../cache',
            __dirname + '/../medias'
        ]
    },

    // Configuration of the router bundle
    router: {
        // The routes
        routes: require('./routes')
    },

    // Configuration of the swig engine
    swig: {
        // Templates path
        path: __dirname + '/../views',

        // Available variables and methods in all templates
        locals: {
            asset: '@assets.getAssetUrl',
            javascript: '@assets.getJavascriptUrls',
            stylesheet: '@assets.getStylesheetUrls'
        }
    }

};
