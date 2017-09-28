describe('Analyst\'s Tests', function() {
		
	//ANALYST's Tests
	it('Analyst login', function() {
		console.log('\n\nRole-Specific Tests:');
		console.log('\nAnalyst: Check if Analyst can login.');
		loginUser(analyst_usrnm, analyst_pswrd);
		expect(browser.getTitle()).toMatch(home_page);
	});

	it('Analyst check privilege when trying to change Configuration', function() {
		console.log('\nAnalyst: Check if Analyst is unable to change a System Configuration.');
		element(by.css(menu_btn)).click();
		element(by.css(config_btn)).click();

		element(by.cssContainingText(optionSidebar_list, system_text)).click();
		deleteButtons = element.all(by.css(systemDeleteButtons_list));
		deleteButtons.get(0).click();
		ignoreSynchronization(function(){
			expect(element(by.css(toast_alert)).getText()).toMatch(insufficientPrivilege_text);
		});
	});

	it('Analyst check privilege when Deleting Accounts', function() {
		console.log('\nAnalyst: Check if Analyst is unable to delete Superuser account.');
		element(by.cssContainingText(optionSidebar_list, userAccounts_text)).click();

		var checkmarks = element.all(by.repeater(selectAllRows_grid)).all(by.css(selectCheckColumn_grid));
		var names = element.all(by.repeater(selectAllRows_grid)).all(by.css(selectUsernameColumn_grid));
		var initialCount = checkmarks.count();
		var index = 0;
		names.filter(function(name) {
			return name.getText().then(function(text) {
				if(text.match(super_usrnm)) {
					checkmarks.get(index).click();
				} 
				index++;
			});
		}).click();

		element(by.cssContainingText(dropdownArrows_list, chooseAction_text)).click();
		element(by.cssContainingText(bulkActions_list, deleteUser_text)).click();
		element(by.css(activeGo_btn)).click();			
		element(by.css(deleteConfirm_btn)).click();
		expect(checkmarks.count()).toBe(initialCount);
	});

	it('Disabled Analyst should be unable to logon', function() {
		console.log('\nAnalyst: Check if Disabled Analyst cannot login.');
		loginUser(dis_usrnm, dis_pswrd);		
   		expect(element(by.repeater(login_alert)).isDisplayed());
   		expect(browser.getTitle()).toMatch(login_page);
	});
});