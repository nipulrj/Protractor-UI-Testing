//test_07_delete.js

describe('Delete Accounts Test', function() {

	it('delete accounts', function() {
		console.log('\n\nDeleting accounts.');
		loginUser(usrnm_keys, pswrd_keys);
		element(by.css(menu_btn)).click();
		element(by.css(config_btn)).click();
		element(by.cssContainingText(optionSidebar_list, userAccounts_text)).click();

		var checkmarks = element.all(by.repeater(selectAllRows_grid)).all(by.css(selectCheckColumn_grid));
		var names = element.all(by.repeater(selectAllRows_grid)).all(by.css(selectUsernameColumn_grid));
		
		var index = 0;
		var deleted = 0;
		names.filter(function(name) {
			return name.getText().then(function(text) {
				if(text.match(testUsers_regex)) {
					checkmarks.get(index).click();
					deleted++;				
				} 
				index++;
			});
		}).click();
		var startNum = index + 1;

		element(by.cssContainingText(dropdownArrows_list, chooseAction_text)).click();
		element(by.cssContainingText(bulkActions_list, deleteUser_text)).click();
		element(by.css(activeGo_btn)).click();			
		element(by.css(deleteConfirm_btn)).click();
		ignoreSynchronization(function(){
			expect(element(by.binding(message_alert)).getText()).toMatch(accountDeletionSuccess_text);
		})		
		expect(checkmarks.count()).toBe(startNum - deleted);
	});
});