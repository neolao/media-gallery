module.exports = {
    // The destination of the computed files
    destination: {
        type: 'directory',
        path: __dirname + '/../cache'
    },

    // The available files
    files: [
        '@website:resources/**/*'
    ],

    // The javascript packages
    javascripts: {
        filters: ['combine'],

        default: {
            files: [
                '@website:resources/fancybox/jquery-1.8.3.min.js',
                '@website:resources/fancybox/jquery.fancybox-main.js',
                '@website:resources/fancybox/jquery.fancybox-thumbs.js'
            ],
            baseUrl: '/javascripts/'
        }
    },

    // The stylesheet packages
    stylesheets: {
        // The default filters for each package
        filters: [
            '@sass.assetFilter'
        ],

        // Package named "default"
        default: {
            // Files of the package
            files: [
                '@website:resources/stylesheets/style.scss'
            ]
        }
    }

};

