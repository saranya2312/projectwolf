var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	login: function(username, password) {
		console.log(username, password);
		var self = this;
		WolfAPI.login(username, password, function(obj) {
			status = obj.success;
			message = obj.msg;
			console.log(status, message);
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_LOGIN_STATUS,
				status: status,
				message: message
			});
			if(status) {
				self.fetchAndSetGroups(username);
			}
		});
	},

	fetchAndSetGroups: function(username) {
        var self = this;
        WolfAPI.getClasses(username, function(classes) {
            self.receiveClasses(classes);
        });
    },

	receiveClasses: function(classes) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.RECEIVE_CLASSES,
			classes: classes
		})
	}
}

module.exports = WolfActions;