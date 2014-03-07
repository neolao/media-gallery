/**
 * Get the thumbnail path based on a media path
 *
 * @param   {String}    mediaPath   The media path
 * @return  {String}                The thumbnail path
 */
module.exports.getThumbnailPath = function(mediaPath)
{
    var path = require('path');

    var directory = path.normalize(__dirname + '/../../../cache');
    var fileName = path.basename(mediaPath, path.extname(mediaPath));
    var thumbnailPath = directory + '/' + fileName + '.thumb.jpg';

    return thumbnailPath;
};

/**
 * Get the normalized path based on a media path
 *
 * @param   {String}    mediaPath   The media path
 * @return  {String}                The normalized path
 */
module.exports.getNormalizedPath = function(mediaPath)
{
    var path = require('path');

    var directory = path.normalize(__dirname + '/../../../cache');
    var fileName = path.basename(mediaPath, path.extname(mediaPath));
    var normalizedPath = directory + '/' + fileName + '.normalized.jpg';

    return normalizedPath;
};

/**
 * Get informations of a media
 *
 * @param   {String}    mediaPath   The media path
 * @return  {Object}                The media informations
 */
module.exports.getInformations = function(mediaPath)
{
    var easyimage = require('easyimage');

    return function(done) {
        easyimage.info(filePath, function(error, result) {
            done(error, result);
        });
    };
};

/**
 * Auto orient an image
 *
 * @param   {String}    filePath    The image path
 */
module.exports.autoOrient = function(filePath)
{
    var exec = require('child_process').exec;
    var command = 'mogrify -auto-orient ' + filePath;

    return function(done) {
        exec(command, function(error, stdout, stderr) {
            done();
        });
    };
};

/**
 * Create a thumbnail
 *
 * @param   {String}    mediaPath   The media path
 * @return  {String}                The thumbnail path
 */
module.exports.createThumbnail = function(mediaPath)
{
    var easyimage = require('easyimage');

    var destinationPath = this.getThumbnailPath(mediaPath);

    return function(done) {
        easyimage.thumbnail({
            src: mediaPath,
            dst: destinationPath,
            width: 100
        }, function(error, result) {
            done(error, destinationPath);
        });
    };
};

/**
 * Create a normalized image
 *
 * @param   {String}    mediaPath   The media path
 * @return  {String}                The normalized image path
 */
module.exports.createNormalized = function(mediaPath)
{
    var easyimage = require('easyimage');

    var destinationPath = this.getNormalizedPath(mediaPath);

    return function(done) {
        easyimage.resize({
            src: mediaPath,
            dst: destinationPath,
            width: 800
        }, function(error, result) {
            done(error, destinationPath);
        });
    };
};


