# GUI Automated Testing with Protractor

## Overview

Protractor is an e2e test framework for Angular applications. This framework runs tests on the UI, as a normal user would.
Utilizing tests created here, manual testing to check for bugs would be uneccessary.

### Prerequisites

Need to either have a external server running the selenium standalone jar or run locally using webdriver-manager in npm.

The selenium standalone server can be downloaded from this [Downloads](http://docs.seleniumhq.org/download/) page.

## How to Use Protractor

All that is needed to run protractor is a single **conf.js** file and one or multiple **spec.js** files.

Then call:

```
protractor conf.js
``` 

More instructions and tutorial are listed below. 

## Workflow

It all starts with a simple test like the following code in a spec.js file (login check):
```
describe('Any Application Name Tests', function() {
	it('check if logging on works', function() {
		browser.get('url');
		element(by.name('usrnm_css')).sendKeys('usrnm_keys');
		element(by.name('pswrd_css')).sendKeys('pswrd_keys');
		element(by.css('login_btn')).click();
		expect(browser.getTitle()).toMatch('home_page');
	});
});	
```

with a simple conf.js file like the following:

```
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://SELENIUM_SERVER:4444/wd/hub',
  specs: ['spec.js'],

  multiCapabilities: [{
    'browserName': 'chrome',
    'version': '54'
    }, {
    'browserName': 'firefox',
    'acceptInsecureCerts': true
    }, {
    'browserName': 'internet explorer',
    'version': '11',
    'enablePersistentHover': false,
    'ie.ensureCleanSession': true
  }],
};
```

Once these two files are together this simple call on the command line begins the test:
```
protractor conf.js
```
The Protractor Test Runner then sends the test to the selenium server that is present in the conf.js file in **seleniumAddress**.

At this point the selenium standalone server at the specified address runs the tests in the spec.js file.

In this case the login test will be ran against Chrome, Firefox, and Internet Explorer. 

Once the test is complete the results will be sent back to the location of where **protractor conf.js** was called and logged accordingly.

There you go, you have created a simple automated test for your UI!

## Using the Automated Script

As shown above, running Protractor is simple with just a conf file and spec file.

With the **protractor-launch** script in the scripts folder, tests can be dynamically ran.

```
bash scripts/protractor-launch data chr,ff,ie stack https://url.com debug

bash scripts/protractor-launch {suite} {browsers} {stackname} {stackname_url} debug
```

This command does all the work mentioned above instantly!

Dynamically, the script calls **protractor-dynamic-conf.py**, which creates a temporary conf file on the fly that matches the parameters stated in the command. Specific desired capabilities are included into each conf file depending on the browsers.

Along with the conf file, a temporary global variables file is also created that links to the conf file allowing the tests to get all the neccessary data to run smoothly. 

*These two files are deleted after the completion the the run.*

### Explanation

The command above requires **3** arguments: The ***Suite***, ***Browsers***, and ***Stackname***

The **data** suite signals to protractor to run all the (specific) tests against the cluster, since "data" is required. Other suites like **empty** can be ran against any cluster with or without data.

The **chr,ff,ie** browser parameter signals the script to create temporary conf file with the single capability for each browser. 

To elaborate, the **chr** portion of the parameter runs a single protractor suite against the Chrome browser. This means a conf and globals file is created to allow Protractor to run the specified suite (individually) against Chrome, like below.
```
protractor conf_chrome.js 
```
Once this run is complete, the next run for the next browser is started, in this case **ff** or Firefox.

The **stack** stackname parameter gives the basic url that the tests require to open the correct page; unless **stackname_url** is specified. 

The https://**url**.com url parameter is only needed if the cluster url does not match the format https://**stack**.com/#/login.

The last parameter **debug** is not needed when using Jenkins but allows the user to view the run on the local browser as long as the webdriver manager is up and running on the local host. The default driver is set to **qa-selenium.niara.com**.

### Suite Parameters - (Case-Sensitive)

* **data** - "All the tests; requires data"
* **empty** - "Basic functionality tests; requires **no** data"
* **login** - "Login tests; requires **no** data"
* **account** - "Account Creation test; requires **no** data"
* **roles** - "Role-Specific tests; requires data & accounts"
* **pages** - "Page-Specific tests; requires data & accounts"
* **action** - "Browser Action Tests; requires data"
* **delete** - "Account Deletion test; requires **no** data, but requires accounts"
* **modes** - "Mode-Specific Tests; requires data"

### Browser Parameters - (Case-Insensitive)
*Must be separated by commas if multiple are used in command*
* **all** - All of the following browsers
* **chr** - Google Chrome
* **ff** - Mozilla Firefox
* **ie** - Microsoft Internet Explorer

## Where to make Changes
***Selenium Address changes***

Go to scripts/protractor-launch and change:

```
if [[ "$4" == 'debug' || "$5" == 'debug' ]]; then
  SELENIUM='localhost'
  SELENIUM_PATH='http://localhost:4444/wd/hub'
else
  SELENIUM='new_selenium'
  SELENIUM_PATH='http://new_selenium:4444/wd/hub'
fi
```

***New Tests being added***

Make sure the new tests are included in the tests folder with the other tests/specs.

Go to write_suites in protractor-dynamic-conf.py and change if you want to add the new test into specific suites:

```
self.file.write(" suites: {\n")
    self.file.write("   data: ['tests/spec*.js'],\n")
    self.file.write("   empty: ['tests/spec01*.js', 'tests/spec02*.js', 'tests/spec07*.js'],\n")
    self.file.write("   login: ['tests/spec01*.js'],\n")
    self.file.write("   new_test: ['tests/new_test*.js'],\n")
    self.file.write(" },\n\n")
```

***Different Desired Capabilities***

Go to write_capability in protractor-dynamic-conf.py and add/remove capabilities:

```
elif re.search('CHR', self.browser, re.I):
      self.file.write("   'version': '54',\n")
      self.file.write("   'new_cap': ['value']\n")
```

## Built Using

* [Protractor](http://www.protractortest.org/#/)
* [JavaScript](https://www.javascript.com)
* [Selenium](http://www.seleniumhq.org)
* npm Packages: [jasmine-reporters](https://www.npmjs.com/package/jasmine-reporters), [protractor-html-reporter](https://www.npmjs.com/package/protractor-html-reporter), [fs-extra](https://www.npmjs.com/package/fs-extra)

## Author
* **Nipul Jayasekera** - *Intern*
