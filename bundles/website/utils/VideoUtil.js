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
            command += ' -b 384k';
            command += ' -flags +loop+mv4';
            command += ' -cmp 256';
            command += ' -partitions +parti4x4+parti8x8+partp4x4+partp8x8';
            command += ' -subq 6';
            command += ' -trellis 0';
            command += ' -refs 5';
            command += ' -bf 0';
            command += ' -flags2 +mixed_refs';
            command += ' -coder 0';
            command += ' -me_range 16';
            command += ' -g 250';
            command += ' -keyint_min 25';
            command += ' -sc_threshold 40';
            command += ' -i_qfactor 0.71';
            command += ' -qmin 10 -qmax 51';
            command += ' -qdiff 4';
            command += ' -acodec libvo_aacenc';
            command += ' -ac 1';
            command += ' -ar 16000';
            command += ' -r 13';
            command += ' -ab 32000';
            command += ' -vprofile baseline';
            command += ' -vf scale=-1:360';
            break;
        case '.ogv':
            command += ' -vcodec libtheora';
            command += ' -acodec libvorbis';
            break;
        case '.webm':
            command += ' -preset libvpx';
            command += ' -acodec libvorbis';
            command += ' -threads 8';
            command += ' -b 384k';
            command += ' -ac 1';
            command += ' -ar 16000';
            command += ' -ab 32000';
            //command += ' -b 3900k';
            //command += ' -ar 44100';
            //command += ' -ac 2';
            //command += ' -ab 128k';
            command += ' -vf scale=-1:360';
            command += ' -f webm';
            command += ' -y';
            break;
    }
    command += ' "' + destinationPath + '"';

    return function(done) {
        exec(command, function(error, stdout, stderr) {
            done(null, destinationPath);
        });
    };
};

