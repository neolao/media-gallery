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
                    type: 'image',
                    normalizedUrl: '/image/normalized/' + file,
                    thumbnailUrl: '/image/thumbnail/' + file
                });
                break;

            // Videos
            case 'video/quicktime':
                medias.push({
                    name: fileName,
                    type: 'video',
                    mp4Url: '/video/normalized/' + file + '.mp4',
                    ogvUrl: '/video/normalized/' + file + '.ogv',
                    thumbnailUrl: '/video/thumbnail/' + file
                });
                break;
            default:
        }
    };


    response.parameters.medias = medias;
    response.statusCode = 200;
    yield response.render('index.swig');
};


/**
 * Serve the image thumbnail
 *
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
proto.imageThumbnail = function*(request, response)
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


/**
 * Serve the video thumbnail
 *
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
proto.videoThumbnail = function*(request, response)
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
    var VideoUtil = require('../utils/VideoUtil');
    var ImageUtil = require('../utils/ImageUtil');
    var thumbnailPath = ImageUtil.getThumbnailPath(filePath);
    var thumbnailExists = yield solfege.util.Node.fs.exists(thumbnailPath);
    if (isChanged || !thumbnailExists) {
        var thumbnailPath = yield VideoUtil.createThumbnail(filePath);
        yield ImageUtil.autoOrient(thumbnailPath);
    }

    // Serve the file
    var fs = require('fs');
    response.statusCode = 200;
    response.body = fs.createReadStream(thumbnailPath);
};


/**
 * Serve the normalized video
 *
 * @param   {solfege.bundle.server.Request}     request     The request
 * @param   {solfege.bundle.server.Response}    response    The response
 */
proto.videoNormalized = function*(request, response)
{
    var pathResolve = require('path').resolve;
    var pathBasename = require('path').basename;
    var pathExtname = require('path').extname;
    var solfege = require('solfegejs');

    var file = decodeURIComponent(request.parameters.file);
    var extension = pathExtname(file);
    var fileName = pathBasename(file, extension);
    var filePath = pathResolve(this.mediaDirectory, fileName);

    // Check if the media exists
    var fileExists = yield solfege.util.Node.fs.exists(filePath);
    if (!fileExists) {
        response.statusCode = 404;
        return;
    }

    // Check informations
    var FileUtil = require('../utils/FileUtil');
    var isChanged = yield FileUtil.isChanged(filePath);


    // Create the normalized video if necessary
    var VideoUtil = require('../utils/VideoUtil');
    var normalizedPath = VideoUtil.getNormalizedPath(filePath, extension);
    var normalizedExists = yield solfege.util.Node.fs.exists(normalizedPath);
    if (isChanged || !normalizedExists) {
        yield VideoUtil.createNormalized(filePath, extension);
    }



    // Get the file size
    var stat = yield solfege.util.Node.fs.stat(normalizedPath);
    var total = stat.size;

    // Serve the file
    var fs = require('fs');
    var range = request.getHeader('range');
    switch (extension) {
        case '.mp4':
            response.setHeader('Content-Type', 'video/mp4');
            break;
        case '.ogv':
            response.setHeader('Content-Type', 'video/ogv');
            break;
        default:
            response.setHeader('Content-Type', 'video/quicktime');
    }
    if (range) {
        var parts = range.replace(/bytes=/, '').split('-');
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total-1;
        if (start > end ) {
            start = end;
        }
        var chunksize = (end-start)+1;

        response.statusCode = 206;
        response.setHeader('Content-Range', 'bytes ' + start + '-' + end + '/' + total);
        response.setHeader('Accept-Ranges', 'bytes');
        response.setHeader('Content-Length', chunksize);
        response.body = fs.createReadStream(normalizedPath, {start: start, end: end});
        return;
    }
    response.setHeader('Content-Length', total);
    response.statusCode = 200;
    response.body = fs.createReadStream(normalizedPath);
};




module.exports = Home;
