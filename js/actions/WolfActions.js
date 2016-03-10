var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');

var WolfActions = {
	login: function(username, password) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.LOGIN,
			username: username,
			password: password
		})
	},

	receiveLoginStatus: function(status, message) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.RECEIVE_LOGIN_STATUS,
			status: status,
			message: message
		})
	}

	receiveClasses: function(classes) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.RECEIVE_CLASSES,
			classes: classes
		})
	}
}

module.exports = WolfActions;