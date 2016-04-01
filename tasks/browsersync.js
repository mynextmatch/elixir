var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var _;
var gutils;
var browserSync;

var config = Elixir.config;

/*
 |----------------------------------------------------------------
 | BrowserSync
 |----------------------------------------------------------------
 |
 | Browsersync makes your browser testing workflow faster by
 | synchronizing URLs, behavior, and code changes across
 | across multiple devices. And, now it's in Elixir!
 |
 */

Elixir.extend('browserSync', function (options) {
    loadPlugins();

    options = _.extend(config.browserSync, {
        files: [
            config.appPath + '/**/*.php',
            config.get('public.css.outputFolder') + '/**/*.css',
            config.get('public.js.outputFolder') + '/**/*.js',
            config.get('public.versioning.buildFolder') + '/rev-manifest.json',
            config.viewPath +'/**/*.php'
        ],
        watchOptions: {
            usePolling: true
        },
        snippetOptions: {
            rule: {
                match: /(<\/body>|<\/pre>)/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        }
    }, options);

    // Browsersync will only run during `gulp watch`.
    if (gutils.env._.indexOf('watch') > -1) {
        browserSync.init(options);
    }

    new Elixir.Task('browserSync', function () {}).watch();
});


/**
 * Load the required Gulp plugins on demand.
 */
var loadPlugins = function () {
    _ = require('underscore');
    gutils = require('gulp-util');
    browserSync = require('browser-sync').create();
};
