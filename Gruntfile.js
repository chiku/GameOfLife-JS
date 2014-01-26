module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        },
        jshint: {
            files: ['public/javascripts/**/*.js', 'config/**/*.js', '*.js'],
            options: {
                strict: true,
                undef: true,
                browser: true,
                node: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['karma', 'jshint']);

    grunt.registerTask('default', ['test']);
};
