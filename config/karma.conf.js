module.exports = function(config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        files: [
            'public/javascripts/**/*.js',
            'spec/javascripts/**/*.js'
        ],
        browsers: ['PhantomJS'],
        singleRun: true,
        reporters: ['spec', 'coverage'],
        preprocessors: {
            'public/javascripts/**/*.js': ['coverage']
        }
    });
};
