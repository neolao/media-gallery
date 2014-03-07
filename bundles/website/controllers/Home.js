var solfege = require('solfegejs');

/**
 * The home controller
 */
var Home = solfege.util.Class.create(function()
{

    var pathNormalize = require('path').normalize;
    this.mediaDirectory = pathNormalize(__dirname + '/../../../medias');

}, 'website.controllers.Home');
var proto = Home.prototype;

/**
 * The directory path of the medias
 *
 * @type {String}
 */
proto.mediaDirectory;

/**
 * Main action
 *
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
proto.index = function*(request, response)
{
    var fs = require('fs');
    var solfege = require('solfegejs');
    var ImageUtil = require('../utils/ImageUtil');
    var pathResolve = require('path').resolve;
    var pathBasename = require('path').basename;
    var pathExtname = require('path').extname;
    var mime = require('mime');


    // Get medias
    // @todo Use generator version
    var files = fs.readdirSync(this.mediaDirectory);
    var medias = [];
    for (var index = 0, total = files.length; index < total; ++index) {
        var file = files[index];
        var filePath = pathResolve(this.mediaDirectory, file);
        var fileType = mime.lookup(filePath);
        var fileName = pathBasename(file, pathExtname(file));

        switch (fileType) {
            // Images
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
                // Add to the media list
                medias.push({
                    name: fileName,
                    normalizedUrl: '/image/normalized/' + file,
                    thumbnailUrl: '/thumbnail/' + file
                });
        }
    };


    response.parameters.medias = medias;
    response.statusCode = 200;
    yield response.render('index.swig');
};


/**
 * Serve the thumbnail
 *
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
proto.thumbnail = function*(request, response)
{
    var pathResolve = require('path').resolve;
    var solfege = require('solfegejs');

    var file = decodeURIComponent(request.parameters.file);
    var filePath = pathResolve(this.mediaDirectory, file);

    // Check if the media exists
    var fileExists = yield solfege.util.Node.fs.exists(filePath);
    if (!fileExists) {
        response.statusCode = 404;
        return;
    }

    // Check informations
    var FileUtil = require('../utils/FileUtil');
    var isChanged = yield FileUtil.isChanged(filePath);

    // Create the thumbnail if necessary
    var ImageUtil = require('../utils/ImageUtil');
    var thumbnailPath = ImageUtil.getThumbnailPath(filePath);
    var thumbnailExists = yield solfege.util.Node.fs.exists(thumbnailPath);
    if (isChanged || !thumbnailExists) {
        thumbnailPath = yield ImageUtil.createThumbnail(filePath);
        yield ImageUtil.autoOrient(thumbnailPath);
    }

    // Serve the file
    var fs = require('fs');
    response.statusCode = 200;
    response.body = fs.createReadStream(thumbnailPath);
};


/**
 * Serve the normalized image
 *
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
proto.imageNormalized = function*(request, response)
{
    var pathResolve = require('path').resolve;
    var solfege = require('solfegejs');

    var file = decodeURIComponent(request.parameters.file);
    var filePath = pathResolve(this.mediaDirectory, file);

    // Check if the media exists
    var fileExists = yield solfege.util.Node.fs.exists(filePath);
    if (!fileExists) {
        response.statusCode = 404;
        return;
    }

    // Check informations
    var FileUtil = require('../utils/FileUtil');
    var isChanged = yield FileUtil.isChanged(filePath);

    // Create the normalized image if necessary
    var ImageUtil = require('../utils/ImageUtil');
    var normalizedPath = ImageUtil.getNormalizedPath(filePath);
    var normalizedExists = yield solfege.util.Node.fs.exists(normalizedPath);
    if (isChanged || !normalizedExists) {
        normalizedPath = yield ImageUtil.createNormalized(filePath);
        yield ImageUtil.autoOrient(normalizedPath);
    }

    // Serve the file
    var fs = require('fs');
    response.statusCode = 200;
    response.body = fs.createReadStream(normalizedPath);
};

module.exports = Home;
