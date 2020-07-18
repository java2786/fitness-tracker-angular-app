// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var xmlBuilder = require('xmlbuilder');
var fs = require("fs");


// const businessTestFile = "./output_revised.txt";
// const boundaryTestFile = "./output_boundary_revised.txt";
// const exceptionTestFile = "./output_exception_revised.txt";



module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),

      require("./test/my-karma-config")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/angularSPA'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },

    reporters: ['progress', 'kjhtml', 'writer'],
    writerReporter: {
      fs,
      xmlBuilder
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
