var WolfActions = require('../actions/WolfActions');

module.exports = {

	//Login a user
	login: function(username, password, callback) {
		//TODO: HIT END POINT
		var obj = {"msg": "Login successful!", "success": true}
		callback(obj);
	},

	getClasses: function(username, callback) {
		//TODO: HIT END POINT
		var classes = ["CS 7641", "CS 6675", "CS 7616", "CS 7650"];
		callback(classes);
	}
}
