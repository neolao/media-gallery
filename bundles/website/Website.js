var solfege = require('solfegejs');

/**
 * The website bundle
 */
var Website = solfege.util.Class.create(function()
{
    // Initialize properties
    this.controllers = require('./controllers');

}, 'website.Website');
var proto = Website.prototype;


/**
 * The directory path of the class
 *
 * @type {string}
 * @api public
 */
proto.__dirname = __dirname;

/**
 * The controller package
 *
 * @type {Object}
 * @api public
 */
proto.controllers;


module.exports = Website;
