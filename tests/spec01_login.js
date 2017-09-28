//test_01_login.js

describe('Login Suite', function() {
	//login with admin username and password, verify if current browser matches homepage
	it('Check if positive username and password entered', function() {
		console.log('\n\nLogin: Checking if the correct credentials allow login.');
		loginUser(usrnm_keys, pswrd_keys);
		expect(browser.getTitle()).toMatch(home_page);
	});

	//click menu btn and then logout btn, and verify if current browser matches homepage and alert is displayed
	it('Check if able to logout', function() {
		console.log('\nLogout: Now checking if able to logout.');
		element(by.css(menu_btn)).click();
		element(by.css(logout_btn)).click();
		expect(browser.getTitle()).toMatch(login_page);
		expect(element(by.css(logout_alert)).isDisplayed());
	});

	//login with garbage credentials, verify if current browser matches loginpage and alert is displayed
	it('Check if negative username or password entered', function() {
		console.log('\nLogin: Checking if alert pops up when credentials are incorrect.');
		loginUser(usrnm_neg, pswrd_neg);
		expect(element(by.repeater(login_alert)).isDisplayed());
		expect(browser.getTitle()).toMatch(login_page);
	});
});