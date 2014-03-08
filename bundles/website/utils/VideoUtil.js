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
 * @param   {String}    extension   The extension
 * @return  {String}                The normalized path
 */
module.exports.getNormalizedPath = function(mediaPath, extension)
{
    var path = require('path');

    var directory = path.normalize(__dirname + '/../../../cache');
    var fileName = path.basename(mediaPath, path.extname(mediaPath));
    var normalizedPath = directory + '/' + fileName + '.normalized' + extension;

    return normalizedPath;
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

/**
 * Normalize a video file
 *
 * @param   {String}    filePath    The file path
 * @param   {String}    extension   The extension
 * @return  {String}                The normalized video path
 */
module.exports.createNormalized = function(filePath, extension)
{
    var exec = require('child_process').exec;
    var destinationPath = this.getNormalizedPath(filePath, extension);
    var command = 'ffmpeg -i "' + filePath + '"';
    switch (extension) {
        default:
        case '.mp4':
            command += ' -vcodec libx264';
            command += ' -acodec libvo_aacenc';
            break;
        case '.ogv':
            command += ' -vcodec libtheora';
            command += ' -acodec libvorbis';
            break;
    }
    command += ' -vprofile baseline';
    command += ' -preset fast';
    command += ' -b:v 250k';
    command += ' -maxrate 250k';
    command += ' -bufsize 500k';
    command += ' -vf scale=-1:360';
    command += ' -threads 0';
    command += ' -ab 96k';
    command += ' "' + destinationPath + '"';

    return function(done) {
        exec(command, function(error, stdout, stderr) {
            done(null, destinationPath);
        });
    };
};

