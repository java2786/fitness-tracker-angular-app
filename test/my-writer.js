module.exports = {
    writeTextFiles: function(result, outputFiles, cb){
        
        let testName = result.fullName.trim(); 
        let fileName = testName.split(" ")[1]; 

        // let testNameToCamelCase = testName.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/^\w/, c => c.toLowerCase());
        let testNameToCamelCase = camelCase(testName);

        let fileOutput = `${testNameToCamelCase}=${result.success}`;
        // console.log(fileOutput);


        if(!!outputFiles[fileName])
        cb(outputFiles[fileName], `${fileOutput}\n`);
        // fs.appendFileSync(outputFiles[fileName], `${fileOutput}\n`);
    },
    prepareXmlFile: function(xml, result){
        // var xml = xmlBuilder.create('test-cases');
        var testCaseType = result.fullName.trim().split(" ")[1];

        // xml.ele('cases', {"xmlns:java": "http://java.sun.com", "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance", "xsi:type":"java:com.assessment.data.TestCase"})
        xml.ele('cases')
        .ele('test-case-type', capitalize(testCaseType=='business'?"functional":testCaseType)).up()
        .ele('expected-output', true).up()
        .ele('name', camelCase(result.fullName.trim())).up()
        .ele('weight', 2).up()
        .ele('mandatory', true).up()
        .ele('desc', "na")
        .end();
    }
}

const capitalize = function(str){
    return str.charAt(0).toUpperCase()+str.substring(1).toLowerCase();
}

const camelCase = function(str){
    var words = str.split(" ").map(word=>{
        return capitalize(word);
    });
    
    return words.join('').charAt(0).toLowerCase()+words.join('').substring(1);
}