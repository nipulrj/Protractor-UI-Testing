#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import sys
import re

class conf:
	"""Used to individually run protractor tests on specific browsers"""
	def __init__(self, browser = "", stackname = "", url = "", path = "", selenium = ""):
		self.file = None
		self.browser = browser
		self.capability = ''
		self.stackname = stackname
		self.url = url
		self.path = path
		self.selenium = selenium
		if(self.browser != "" and self.path != ""):
			self.file = open(self.path, "w+")
			if re.search('CHR', self.browser, re.I):
				self.capability = 'chrome'
			elif re.search('FF', self.browser, re.I):
				self.capability = 'firefox'
			elif re.search('IE', self.browser, re.I):
				self.capability = 'internet explorer'
			if re.search('CHR-H', self.browser, re.I):
				self.capability = 'chrome'
			self.write_to_file()

	"""Sets the Selenium Address"""
	def write_selenium(self):
	 	self.file.write("	framework: 'jasmine',\n")
	 	self.file.write("	seleniumAddress: '"+self.selenium+"',\n")

	"""Sets Accessible Suites"""
	def write_suites(self):
		self.file.write("	suites: {\n")
		self.file.write("		data: ['tests/spec*.js'],\n")
		self.file.write("		empty: ['tests/spec01*.js', 'tests/spec02*.js', 'tests/spec07*.js'],\n")
		self.file.write("		login: ['tests/spec01*.js'],\n")
		self.file.write("		account: ['tests/spec02*.js'],\n")
		self.file.write("		roles: ['tests/spec03*.js'],\n")
		self.file.write("		pages: ['tests/spec04*.js'],\n")
		self.file.write("		action: ['tests/spec05*.js'],\n")
		self.file.write("		modes: ['tests/spec06*.js'],\n")
		self.file.write("		delete: ['tests/spec07*.js']\n")
		self.file.write("	},\n\n")

	"""Timeout options/Required IE Location/Url setup"""
	def write_options(self):
		self.file.write("	allScriptsTimeout: 440000,\n")
		self.file.write("	getPageTimeout: 20000,\n")
		self.file.write("	acceptSslCerts: true,\n")
		self.file.write("	maxSessions: 1,\n")
		self.file.write("	jasmineNodeOpts: {\n")
		self.file.write("		showColors: true,\n");
		self.file.write("		defaultTimeoutInterval: 300000\n")
		self.file.write("	},\n\n")

		if self.capability == 'internet explorer':
			self.file.write("	localSeleniumStandaloneOpts : {\n")
			self.file.write("		jvmArgs : ['-Dwebdriver.ie.driver=C:/Windows/System32']\n")
			self.file.write("	},\n\n")

		self.file.write("	params: {\n")
		self.file.write("		url: '"+self.url+"'\n")
		self.file.write("	},\n")

	"""Desired Capabilities determined by browser"""
	def write_capability(self):
		self.file.write("	capabilities: {\n")
		self.file.write("		'browserName': '"+self.capability+"',\n")
		
		if re.search('CHR-H', self.browser, re.I):
			self.file.write("		'chromeOptions': {\n")
  			self.file.write("			'args': [ \"--headless\", \"--disable-gpu\", \"--window-size=800x600\" ]\n")
			self.file.write("		}\n")
			
		elif re.search('CHR', self.browser, re.I):
			self.file.write("		'version': '54'\n")

		elif re.search('FF', self.browser, re.I):
			self.file.write("		'version': '49',\n")
			self.file.write("		'exclude': ['tests/spec05*.js'],\n")
			self.file.write("		'acceptInsecureCerts': true\n")

		elif re.search('IE', self.browser, re.I):
			self.file.write("		'version': '11',\n")
			self.file.write("		'exclude': ['tests/spec04_pages_e360.js', 'tests/spec05*.js', 'tests/spec06*.js'],\n")
			self.file.write("		'enablePersistentHover': false,\n")
			self.file.write("		'requireWindowFocus': false,\n")
			self.file.write("		'ie.ensureCleanSession': true\n")

		self.file.write("	},\n\n")

	"""On Prepare block: instantiates globals, xml output, screenshots on failure, ignoreSynchronization"""
	def write_onPrepare(self):
		self.file.write("	onPrepare: function() {\n")

		self.file.write("		var jasmineReporters = require('jasmine-reporters');\n")
		self.file.write("		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({\n")
		self.file.write("			consolidateAll: true,\n")
		self.file.write("			savePath: './',\n")
		self.file.write("			filePrefix: 'protractor-xmloutput'\n")
		self.file.write("		}));\n")

		self.file.write("		var fs = require('fs-extra');\n")
		self.file.write("		jasmine.getEnv().addReporter({\n")
		self.file.write("			specDone: function(result) {\n")
		self.file.write("				if (result.status == 'failed') {\n")
		self.file.write("					browser.getCapabilities().then(function (caps) {\n")
		self.file.write("						var browserName = caps.get('browserName');\n")
		self.file.write("						browser.takeScreenshot().then(function (png) {\n")
		self.file.write("							var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');\n")
		self.file.write("							stream.write(new Buffer(png, 'base64'));\n")
		self.file.write("							stream.end();\n")
		self.file.write("						});\n")
		self.file.write("					});\n")
		self.file.write("				}\n")
		self.file.write("			}\n")
		self.file.write("		});\n")

		self.file.write("		var keys = Object.keys(globals.variables);\n")
		self.file.write("		for(var i = 0; i < keys.length; i++) {\n")
		self.file.write("			global[keys[i]] = globals.variables[keys[i]];\n")
		self.file.write("		}\n")

		if self.capability == 'internet explorer':
			self.file.write("		global.getURL = function() {\n")
			self.file.write("			browser.driver.manage().window().setSize(1400, 900);\n")
			self.file.write("			browser.driver.manage().window().maximize();\n")
			self.file.write("			browser.ignoreSynchronization = true;\n")
			self.file.write("			browser.get(browser.params.url);\n")
			self.file.write("			browser.findElement(by.css('#overridelink')).click();\n")
			self.file.write("			browser.ignoreSynchronization = false;\n")
			self.file.write("		};\n")
		else:
			self.file.write("		global.getURL = function() {\n")
			self.file.write("			browser.driver.manage().window().setSize(1400, 900);\n")
			self.file.write("			browser.driver.manage().window().maximize();\n")
			self.file.write("			browser.get(browser.params.url);\n")
			self.file.write("		};\n")

		self.file.write("		global.loginUser = function(username, password) {\n")
		self.file.write("			browser.restart();\n")
		self.file.write("			browser.call(getURL);\n")
		self.file.write("			element(by.name(usrnm_css)).sendKeys(username);\n")
		self.file.write("			element(by.name(pswrd_css)).sendKeys(password);\n")
		self.file.write("			element(by.css(login_btn)).click();\n")
		self.file.write("		};\n")

		self.file.write("		global.ignoreSynchronization = function(callback){\n")
		self.file.write("			browser.ignoreSynchronization = true;\n")
		self.file.write("			browser.sleep(1500);\n")
		self.file.write("			callback();\n")
		self.file.write("			browser.sleep(1500);\n")
		self.file.write("			browser.ignoreSynchronization = false;\n")
		self.file.write("		}\n")

		self.file.write("		keys = null;\n")
		self.file.write("	},\n\n")

	"""On Complete block: format html results from xml output with screenshots, cleans up global variables"""
	def write_onComplete(self):
		self.file.write("	onComplete: function() {\n")
		self.file.write("		console.log('Iteration Complete!');\n")
		self.file.write("		var browserName, browserVersion;\n")
		self.file.write("		browser.getCapabilities().then(function (caps) {\n")
		self.file.write("			browserName = caps.get('browserName');\n")
		self.file.write("			browserVersion = caps.get('version');\n")
		self.file.write("			var HTMLReport = require('protractor-html-reporter');\n")
		self.file.write("			testConfig = {\n")
		self.file.write("				reportTitle: 'Test Execution Report',\n")
		self.file.write("				outputPath: './',\n")
		self.file.write("				screenshotPath: './screenshots',\n")
		self.file.write("				testBrowser: browserName,\n")
		self.file.write("				browserVersion: browserVersion,\n")
		self.file.write("				modifiedSuiteName: false,\n")
		self.file.write("				screenshotsOnlyOnFailure: true\n")
		self.file.write("			};\n")
		self.file.write("			new HTMLReport().from('protractor-xmloutput.xml', testConfig);\n")
		self.file.write("		});\n")
		self.file.write("		global.getURL = null;\n")
		self.file.write("		global.loginUser = null;\n")
		self.file.write("		global.ignoreSynchronization = null;\n")
		self.file.write("		var keys = Object.keys(globals.variables);\n")
		self.file.write("		for(var i = 0; i < keys.length; i++) {\n")
		self.file.write("			global[keys[i]] = null\n")
		self.file.write("		}\n")
		self.file.write("		globals = null;\n")
		self.file.write("		keys = null;\n\n")
		self.file.write("		console.log('Cleanup Complete!');\n")
		self.file.write("	}\n")

	"""Writes the entire file, with unique values"""
	def write_to_file(self):
		self.file.write("var globals = require('./"+self.stackname+"-globals.js');\n")
		self.file.write("exports.config = {\n")
		self.write_selenium()
		self.write_suites()
		self.write_options()
		self.write_capability()
		self.write_onPrepare()
		self.write_onComplete()
		self.file.write("};")

"""Main function that does all the work, if all the information is available"""
def dynamic_conf():
	if len(sys.argv) == 6:
		new_conf = conf(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
		print "\nBrowser: "+new_conf.browser+"\n"

dynamic_conf()