var solfege = require('solfegejs');

/**
 * The home controller
 */
var Home = solfege.util.Class.create(function()
{

}, 'website.controllers.Home');
var proto = Home.prototype;

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
    var pathNormalize = require('path').normalize;
    var pathBasename = require('path').basename;
    var pathExtname = require('path').extname;
    var mime = require('mime');

    var mediaDirectory = pathNormalize(__dirname + '/../../../medias');

    // Get medias
    // @todo Use generator version
    var files = fs.readdirSync(mediaDirectory);
    var medias = [];
    for (var index = 0, total = files.length; index < total; ++index) {
        var file = files[index];
        var filePath = mediaDirectory + '/' + file;
        var fileType = mime.lookup(filePath);
        var fileName = pathBasename(file, pathExtname(file));

        switch (fileType) {
            // Images
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
                // Create the normalized image if necessary
                var normalizedPath = ImageUtil.getNormalizedPath(filePath);
                var normalizedExists = yield solfege.util.Node.fs.exists(normalizedPath);
                if (!normalizedExists) {
                    normalizedPath = yield ImageUtil.createNormalized(filePath);
                    yield ImageUtil.autoOrient(normalizedPath);
                }

                // Create the thumbnail if necessary
                var thumbnailPath = ImageUtil.getThumbnailPath(filePath);
                var thumbnailExists = yield solfege.util.Node.fs.exists(thumbnailPath);
                if (!thumbnailExists) {
                    thumbnailPath = yield ImageUtil.createThumbnail(filePath);
                    yield ImageUtil.autoOrient(thumbnailPath);
                }

                // Add to the media list
                medias.push({
                    name: fileName,
                    normalizedUrl: pathBasename(normalizedPath),
                    thumbnailUrl: pathBasename(thumbnailPath)
                });
        }
    };


    response.parameters.medias = medias;
    response.statusCode = 200;
    yield response.render('index.swig');
};


module.exports = Home;
