module.exports = {
    // The destination of the computed files
    destination: {
        type: 'directory',
        path: __dirname + '/../public'
    },

    // The available files
    files: [
        '@website:resources/images/**/*'
    ],

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

