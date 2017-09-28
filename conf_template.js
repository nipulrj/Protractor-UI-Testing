//used to get all the global values to be used in the tests
var globals = require('./globals.js');

exports.config = {
	framework: 'jasmine',
	//selenium address
	seleniumAddress: 'http://SELENIUM:4444/wd/hub',
	
	//suites to be accessible
	suites: {
		data: ['tests/spec*.js'],
		empty: ['tests/spec01*.js', 'tests/spec02*.js', 'tests/spec06*.js'],
		login: ['tests/spec01*.js'],
		account: ['tests/spec02*.js'],
		roles: ['tests/spec03*.js'],
		pages: ['tests/spec04*.js'],
		action: ['tests/spec05*.js'],
		delete: ['tests/spec06*.js'],
		modes: ['tests/spec07*.js']
	},

	//timeout and other options
	allScriptsTimeout: 440000,
	getPageTimeout: 20000,
	acceptSslCerts: true,
	maxSessions: 1,
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 300000
	},

	//defines the stackname url to be used throughout tests
	params: {
		url: 'https://URL'
	},

	//browser desired capabilities
	capabilities: {
		'browserName': 'chrome',
		'version': '54'
	},

	onPrepare: function() {
		//constructs xml results at the end of the run
		var jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
    		consolidateAll: true,
    		savePath: './',
    		filePrefix: 'xmlresults'
		}));
		
		//used to take screenshots on failure
		var fs = require('fs-extra');
    	jasmine.getEnv().addReporter({
        	specDone: function(result) {
            	if (result.status == 'failed') {
                	browser.getCapabilities().then(function (caps) {
                    	var browserName = caps.get('browserName');
 
                    	browser.takeScreenshot().then(function (png) {
                    		//location where screenshots are sent to
                        	var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                        	stream.write(new Buffer(png, 'base64'));
                        	stream.end();
                    	});
                	});
            	}
        	}
    	});
    	//instantiates globals
		var keys = Object.keys(globals.variables);
		for(var i = 0; i < keys.length; i++) {
			global[keys[i]] = globals.variables[keys[i]];
		}
		//global URL function to get browser
		global.getURL = function() {
			browser.manage().window().setSize(1800, 1000);
			browser.get(browser.params.url);
		};
		//restarts browser and logs on with specified username and password
		global.loginUser = function(username, password) {
			browser.restart();
			browser.call(getURL);
			element(by.name(usrnm_css)).sendKeys(username);
			element(by.name(pswrd_css)).sendKeys(password);
			element(by.css(login_btn)).click();
		};
		//used to detect pop-up/disappearing elements like toast messages
		global.ignoreSynchronization = function(callback){
			browser.ignoreSynchronization = true;
			browser.sleep(1000);
			callback();
			browser.sleep(1000);
			browser.ignoreSynchronization = false;
		}
		keys = null;
	},

	onComplete: function() {
     	var browserName, browserVersion;
     	var capsPromise = browser.getCapabilities();
 		//used to format a html result page that use failure screenshots
     	capsPromise.then(function (caps) {
        	browserName = caps.get('browserName');
        	browserVersion = caps.get('version');
 
        	var HTMLReport = require('protractor-html-reporter');
 
        	testConfig = {
            	reportTitle: 'Test Execution Report',
            	outputPath: './',
            	screenshotPath: './screenshots',
            	testBrowser: browserName,
            	browserVersion: browserVersion,
            	modifiedSuiteName: false,
            	screenshotsOnlyOnFailure: true
        	};
        	new HTMLReport().from('xmlresults.xml', testConfig);
    	});

    	//cleanup global variables
		global.getURL = null;
		global.loginUser = null;
		global.ignoreSynchronization = null;
		var keys = Object.keys(globals.variables);
		for(var i = 0; i < keys.length; i++) {
			global[keys[i]] = null
		}
		globals = null;
		keys = null;

		console.log('Cleanup Complete!');
	}
};