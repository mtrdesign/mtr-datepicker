module.exports = function(config) {
    var cfg = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-jquery', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
          'scripts/*.js',
          'tests/libs/jquery-1.11.3.min.js',
          'tests/spec/**/*Spec.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "scripts/*.js": ["coverage"]
        },


        coverageReporter: {
            type: 'lcov',
            dir: 'tests/coverage',
            subdir: '.'
        },  


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-coverage'
        ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'ChromeCanary', 'Firefox'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            },
            FirefoxAutoAllowGUM: {
                base: 'Firefox',
                flags: ['--no-sandbox']
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    };

    if (process.env.TRAVIS) {
        cfg.browsers = ['Chrome_travis_ci', 'FirefoxAutoAllowGUM'];
    }

    config.set(cfg);
};