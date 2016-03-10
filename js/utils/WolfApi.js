var WolfActions = require('../actions/WolfActions');

module.exports = {

	//Login a user
	login: function(username, password) {
		//TODO: HIT END POINT
		var status = true;
		var message = "Login Successful";
		WolfActions.receiveLoginStatus(status, message);
	}

	getClasses: function(username) {
		//TODO: HIT END POINT
		var classes = ["CS 7641", "CS 6675", "CS 7616", "CS 7650"];
		WolfActions.receiveClasses(classes);
	}
}