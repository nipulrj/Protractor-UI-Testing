//test_02_accounts.js

describe('Accounts Suite', function() {
	//login and go to add User Accounts page
	it('Logon and go to User Creation', function() {
		console.log('\n\nAdding New Users for Testing:')
		console.log('\nMoving to Users List Page.');
		loginUser(usrnm_keys, pswrd_keys);
		element(by.css(menu_btn)).click();
		element(by.css(config_btn)).click();
		expect(browser.getTitle()).toMatch(config_page);
		element(by.cssContainingText(optionSidebar_list, userAccounts_text)).click();
		expect(browser.getTitle()).toMatch(userGrid_page);
	});

	//add a new user based on role
	function addUser(role, role_num) {
		element(by.css(newUser_icon)).click();

		element(by.css(addUser_dropdownMenu_btn)).click();
		var roles = element.all(by.repeater(roles_list));		
		expect(roles.count()).toBe(5);
		
		roles.get(role_num).click();
		expect(element(by.css(addUser_dropdownMenu_btn)).getText()).toBe(role);
	};

	it('add Superuser', function() {
		console.log('\nAdding Superuser.');
		addUser(super_name, super_listNum);
		element(by.name(usrnm_css)).sendKeys(super_usrnm);
		element(by.name(email_css)).sendKeys(super_email);
		element(by.name(pswrd_css)).sendKeys(super_pswrd);
		element(by.name(pswrd_conf_css)).sendKeys(super_pswrd);

		expect(element(by.css(saveUser_btn)).isEnabled());
		element(by.css(saveUser_btn)).click();
		expect(element(by.binding(message_alert)).getText()).toBe(accountCreationSuccess_text);
		expect(element.all(by.css('.contain-btn span')).first().getText()).toBe(super_usrnm);
	});

	it('add Senior Analyst', function() {
		console.log('\nAdding Senior Analyst.');
		addUser(senior_name, senior_listNum);
		element(by.name(usrnm_css)).sendKeys(senior_usrnm);
		element(by.name(email_css)).sendKeys(senior_email);
		element(by.name(pswrd_css)).sendKeys(senior_pswrd);
		element(by.name(pswrd_conf_css)).sendKeys(senior_pswrd);

		expect(element(by.css(saveUser_btn)).isEnabled());
		element(by.css(saveUser_btn)).click();
		expect(element(by.binding(message_alert)).getText()).toBe(accountCreationSuccess_text);
		expect(element.all(by.css('.contain-btn span')).first().getText()).toBe(senior_usrnm);
	});

	it('add Analyst', function() {
		console.log('\nAdding Analyst.');
		addUser(analyst_name, analyst_listNum);
		element(by.name(usrnm_css)).sendKeys(analyst_usrnm);
		element(by.name(email_css)).sendKeys(analyst_email);
		element(by.name(pswrd_css)).sendKeys(analyst_pswrd);
		element(by.name(pswrd_conf_css)).sendKeys(analyst_pswrd);

		expect(element(by.css(saveUser_btn)).isEnabled());
		element(by.css(saveUser_btn)).click();
		expect(element(by.binding(message_alert)).getText()).toBe(accountCreationSuccess_text);
		expect(element.all(by.css('.contain-btn span')).first().getText()).toBe(analyst_usrnm);
	});

	it('add Read-only Analyst', function() {
		console.log('\nAdding Read-only Analyst.');
		addUser(read_name, read_listNum);
		element(by.name(usrnm_css)).sendKeys(read_usrnm);
		element(by.name(email_css)).sendKeys(read_email);
		element(by.name(pswrd_css)).sendKeys(read_pswrd);
		element(by.name(pswrd_conf_css)).sendKeys(read_pswrd);

		expect(element(by.css(saveUser_btn)).isEnabled());
		element(by.css(saveUser_btn)).click();
		expect(element(by.binding(message_alert)).getText()).toBe(accountCreationSuccess_text);
		expect(element.all(by.css('.contain-btn span')).first().getText()).toBe(read_usrnm);
	});

	it('add Obfuscated Analyst', function() {
		console.log('\nAdding Obfuscated Analyst.');
		addUser(obf_name, obf_listNum);
		element(by.name(usrnm_css)).sendKeys(obf_usrnm);
		element(by.name(email_css)).sendKeys(obf_email);
		element(by.name(pswrd_css)).sendKeys(obf_pswrd);
		element(by.name(pswrd_conf_css)).sendKeys(obf_pswrd);

		expect(element(by.css(saveUser_btn)).isEnabled());
		element(by.css(saveUser_btn)).click();
		expect(element(by.binding(message_alert)).getText()).toBe(accountCreationSuccess_text);
		expect(element.all(by.css('.contain-btn span')).first().getText()).toBe(obf_usrnm);
	});

	it('add Disabled Analyst', function() {
		console.log('\nAdding Disabled Analyst.');
		addUser(analyst_name, analyst_listNum);
		//check if Save User button is disabled without entering Confirm Password section.
		element(by.name(usrnm_css)).sendKeys(dis_usrnm);
		element(by.name(email_css)).sendKeys(dis_email);
		element(by.name(pswrd_css)).sendKeys(dis_pswrd);
		expect(element(by.css(saveUser_btn)).isEnabled()).toBe(false);
		//setting status to Disabled and creating account.')
		element(by.cssContainingText(status_list, disabled_text)).click();
		element(by.name(pswrd_conf_css)).sendKeys(dis_pswrd);
		expect(element(by.css(saveUser_btn)).isEnabled());
		element(by.css(saveUser_btn)).click();
		expect(element(by.binding(message_alert)).getText()).toBe(accountCreationSuccess_text);
		expect(element.all(by.css('.contain-btn span')).first().getText()).toBe(dis_usrnm);
	});
});