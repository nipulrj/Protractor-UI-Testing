//globals.js
module.exports = {
	variables : {

	//CSS globals
	usrnm_css: 'username',
	pswrd_css: 'password',
	email_css: 'email',
	pswrd_conf_css: 'confirm_password',

	//Send Key globals
	usrnm_keys: 'admin',
	pswrd_keys: 'admin',
	usrnm_neg: 'garbage',
	pswrd_neg: 'garbage',

	//Alert CSS globals
	logout_alert: '.alert-info',
	login_alert: 'message in value.messages',
	message_alert: 'message.content',
	toast_alert: '.md-toast-text',

	//Button CSS globals
	login_btn: '.btn-login',
	menu_btn: '.apps-menu-button',
	logout_btn: '#logout span',
	config_btn: '#configuration span',
	optionDownArrow_btn: '.arrow-down',
	activeGo_btn: '.round-button.active',
	statusConfirm_btn :'.submit-btn',
	deleteConfirm_btn: '.btnOk.btn-primary',

	//Page Title globals
	home_page: 'Home',
	login_page: 'Login',
	config_page: 'Settings - Configuration',
	userCreation_page: 'Users - Create',
	userGrid_page: 'Users - List',

	//Text Lookup globals
	userAccounts_text: 'User Accounts',
	features_text: 'Features',
	system_text: 'System',
	disabled_text: 'Disabled',
	chooseAction_text: 'Click to set an action',
	deleteUser_text: 'Delete User',
	alertClosed_text: 'Closed',
	insufficientPrivilege_text: 'Action not allowed due to insufficient privilege.',
	accountCreationSuccess_text: 'User successfully created.',
	accountDeletionSuccess_text: 'Users have been deleted successfully.',
	alertStatusSuccess_text: 'Status is changed successfully',
	userFilter_text: 'User',
	hostFilter_text: 'Host',
	ipFilter_text: 'IP',
	
	//Grid Access CSS globals
	selectAllRows_grid: '(rowRenderIndex, row)',
	selectTypeColumn_grid: '.column-entity-type i',
	selectNameColumn_grid: '.column-name-entity span',
	
	//List Access CSS globals
	optionSidebar_list: 'span.optionLink-primary',

	//Regex Expressions globals
	userObf_regex: '^u_*',
	hostObf_regex: '^h_*',

	//Attribute Select CSS globals
	class_atr: 'class',

	//Icon Select CSS globals
	user_icon: 'nif nif-user',
	host_icon: 'nif nif-host',

	//Account Info globals
	super_name: 'Superuser',
	super_listNum: 0,
	super_usrnm: 'super_test',
	super_email: 'super_test@niara.com',
	super_pswrd: 'super',

	senior_name: 'Senior Analyst',
	senior_listNum: 1,
	senior_usrnm: 'senior_test',
	senior_email: 'senior_test@niara.com',
	senior_pswrd: 'senior',

	analyst_name: 'Analyst',
	analyst_listNum: 2,
	analyst_usrnm: 'ana_test',
	analyst_email: 'ana_test@niara.com',
	analyst_pswrd: 'ana',

	read_name: 'Read-only Analyst',
	read_listNum: 3,
	read_usrnm: 'read_test',
	read_email: 'read_test@niara.com',
	read_pswrd: 'read',

	obf_name: 'Obfuscated Analyst',
	obf_listNum: 4,
	obf_usrnm: 'obf_test',
	obf_email: 'obf_test@niara.com',
	obf_pswrd: 'obf',

	dis_usrnm: 'dis_test',
	dis_email: 'dis_test@niara.com',
	dis_pswrd: 'dis'
 	}
};