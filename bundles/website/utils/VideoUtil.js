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
 * Get the capture path based on a media path
 *
 * @param   {String}    mediaPath   The media path
 * @return  {String}                The capture path
 */
module.exports.getCapturePath = function(mediaPath)
{
    var path = require('path');

    var directory = path.normalize(__dirname + '/../../../cache');
    var fileName = path.basename(mediaPath, path.extname(mediaPath));
    var thumbnailPath = directory + '/' + fileName + '.capture.jpg';

    return thumbnailPath;
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
    var exec = require('child_process').exec;

    var destinationPath = this.getThumbnailPath(mediaPath);
    var capturePath = this.getCapturePath(mediaPath);
    var command = 'ffmpeg -i "' + mediaPath + '" -t 2 -r 1 ' + capturePath;

    return function(done) {
        exec(command, function(error, stdout, stderr) {

            var easyimage = require('easyimage');
            easyimage.thumbnail({
                src: capturePath,
                dst: destinationPath,
                width: 100
            }, function(error, result) {
                done(error, destinationPath);
            });

        });
    };

};


