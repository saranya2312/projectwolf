var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	login: function(username, password) {
		WolfAPI.login(username, password, function(msg) {
			WolfDispatcher.handleAction({
				actionType: WolfConstants.DISPLAY_MESSAGE,
				message: msg
			});
		});
	},

	setMessage: function(message) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.DISPLAY_MESSAGE,
			message: message
		});
	}
}

module.exports = WolfActions;