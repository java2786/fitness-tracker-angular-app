var myWriter = require("./my-writer");

var WriterReporter = function (baseReporterDecorator, config, logger, helper, formatError) {

    var writerConfig = config.writerReporter || {};
    var fs = writerConfig.fs;

    var xmlBuilder = writerConfig.xmlBuilder;
    var xml = xmlBuilder.create('test-cases');

    var outputFiles = {
        business: "./output_revised.txt",
        boundary: "./output_boundary_revised.txt",
        exception: "./output_exception_revised.txt",
        xml: "./yaksha-test-cases.xml"
    };

    baseReporterDecorator(this);

    this.onRunStart = function (browsers) {


        fs.unlink(outputFiles.business, (err) => { if (err) console.log(`${outputFiles.business} not deleted`); });
        fs.unlink(outputFiles.boundary, (err) => { if (err) console.log(`${outputFiles.boundary} not deleted`); });
        fs.unlink(outputFiles.exception, (err) => { if (err) console.log(`${outputFiles.exception} not deleted`); });
        fs.unlink(outputFiles.xml, (err) => { if (err) console.log(`${outputFiles.xml} not deleted`); });

    };

    this.onRunComplete = function (browsers, results) {
        // write xml
        fs.writeFileSync(outputFiles.xml, xml.toString({ pretty: true }));
    };

    this.onBrowserStart = function (browser) {
        // ...
    };

    this.specSuccess = function (browser, result) {
        // ...
    }
    this.specFailure = function (browser, result) {
        // ...
    };

    this.onSpecComplete = function (browser, result) {


        myWriter.writeTextFiles(result, outputFiles, function (file, data) {
            fs.appendFileSync(file, data);
        });

        myWriter.prepareXmlFile(xml, result);

    }

};

WriterReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper', 'formatError'];



module.exports = {
    'reporter:writer': ['type', WriterReporter]
};