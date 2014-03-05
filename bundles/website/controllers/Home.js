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
    response.statusCode = 200;
    yield response.render('index.swig');
};


module.exports = Home;
