/**
 * Check if a file is changed
 *
 * @param   {String}    filePath    The file path
 * @return  {Boolean}               true if the file is changed, false otherwise
 */
module.exports.isChanged = function*(filePath)
{
    var path = require('path');
    var solfege = require('solfegejs');

    // Get the current informations
    var currentInformations = yield solfege.util.Node.fs.stat(filePath);
    currentInformations = JSON.stringify(currentInformations);
    currentInformations = JSON.parse(currentInformations);

    // Get the cache file path
    var directory = path.normalize(__dirname + '/../../../cache');
    var fileName = path.basename(filePath, path.extname(filePath));
    var cacheFile = path.resolve(directory, fileName + '.informations.txt');

    // Check the cache content
    var cacheExists = yield solfege.util.Node.fs.exists(cacheFile);
    if (cacheExists) {
        var cacheInformations = yield solfege.util.Node.fs.readFile(cacheFile);
        cacheInformations = JSON.parse(cacheInformations);

        if (cacheInformations.mtime === currentInformations.mtime) {
            return false;
        }
    }

    // Save the current informations
    currentInformations = JSON.stringify(currentInformations);
    yield solfege.util.Node.fs.writeFile(cacheFile, currentInformations);

    return true;
};
