describe('Superuser\'s Tests', function() {
	
	//SUPERUSER's Tests
	it('Superuser login', function() {
		console.log('\n\nSuper: Check if Superuser can login.');
		loginUser(super_usrnm, super_pswrd);
		expect(browser.getTitle()).toMatch(home_page);
	});

	it('Superuser change in Configuration Features', function() {
		console.log('\nSuper: Check if Superuser is able to change an Advanced Feature.');
		element(by.css(menu_btn)).click();
		element(by.css(config_btn)).click();
		element(by.cssContainingText(optionSidebar_list, features_text)).click();
		var feature = element.all(by.css(featureSwitches_list)).get(0);
		var status = element.all(by.css(featureStatus_list)).get(0);
		
		var initialStatus = status.getText();
		feature.click();
		element(by.css(deleteConfirm_btn)).click();
		browser.sleep(2000);
		expect(status.getText()).not.toBe(initialStatus);

		status.getText().then(function(text) {
			if(text != 'Enabled') {
				feature.click();
				element(by.css(deleteConfirm_btn)).click();
				browser.sleep(2000);
				expect(status.getText()).not.toBe(text);
				expect(status.getText()).toBe('Enabled');
			}
		});
	});
});