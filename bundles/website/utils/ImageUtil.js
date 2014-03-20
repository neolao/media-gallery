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
    var exec = require('child_process').exec;
    var command = 'identify -format "%m %z %w %h %b %x %f" "' + mediaPath + '"';

    return function(done) {
        exec(command, function(error, stdout, stderr) {

            if (stderr.match(/^identify:/)) {
                done(new Error('Unsupported image'));
            } else {
                var temp = stdout.replace('PixelsPerInch', '').split(' ');

                if (temp.length < 7) {
                    done(new Error('Unsupported image'));
                } else {
                    var info     = {};
                    info.type    = temp[0];
                    info.depth   = parseInt(temp[1]);
                    info.width   = parseInt(temp[2]);
                    info.height  = parseInt(temp[3]);
                    info.size    = parseInt(temp[4]);
                    info.density = parseFloat(temp[5]);
                    info.name    = temp.slice(6).join(' ').replace(/(\r\n|\n|\r)/gm,'');

                    done(null, info);
                }
            }
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
    var command = 'mogrify -auto-orient "' + filePath + '"';

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
    var self = this;
    var destinationPath = this.getThumbnailPath(mediaPath);
    var exec = require('child_process').exec;

    return function(done) {
        var promise = self.getInformations(mediaPath);
        promise(function(error, informations) {
            var command = 'convert "' + mediaPath + '" -auto-orient -crop ' + informations.width + 'x' + informations.height + '+0+0 -resize 100x100 -gravity Center "' + destinationPath + '"';
            exec(command, function(error, stdout, stderr) {
                done(null, destinationPath);
            });
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
    var self = this;
    var destinationPath = this.getNormalizedPath(mediaPath);
    var exec = require('child_process').exec;
    var command = 'convert "' + mediaPath + '" -auto-orient -geometry 800x "' + destinationPath + '"';

    return function(done) {
        exec(command, function(error, stdout, stderr) {
            done(null, destinationPath);
        });
    };
};


