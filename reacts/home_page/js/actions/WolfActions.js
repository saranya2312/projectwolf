var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	login: function(username) {
		this.setMessage("");
		WolfAPI.login(username, function(msg) {
			WolfDispatcher.handleAction({
				actionType: WolfConstants.DISPLAY_MESSAGE,
				message: msg
			});
		});
	},

	setIsLogin: function(bool) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_IS_LOGIN,
			bool: bool
		});
	},

	register: function(username, macAddress) {
		this.setMessage("");
		WolfAPI.register(username, macAddress, function(obj) {
			if(obj.success) {
				WolfDispatcher.handleAction({
		 			actionType: WolfConstants.SET_IS_LOGIN,
		 			bool: WolfConstants.IS_OTP
		 		});
			} else {
				WolfDispatcher.handleAction({
			 		actionType: WolfConstants.DISPLAY_MESSAGE,
			 		message: obj.msg
		 		});
		 	}
		});
	},

	okay: function() {
		this.setMessage("");	
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_IS_LOGIN,
			bool: WolfConstants.IS_LOGIN
		});
	},

	otp: function(username, otp) {
		this.setMessage("");	
		WolfAPI.otp(username, otp, function(obj) {
			if(obj.success) {
				WolfDispatcher.handleAction({
		 			actionType: WolfConstants.SET_IS_LOGIN,
		 			bool: WolfConstants.IS_DIALOG
		 		});
			} else {
				WolfDispatcher.handleAction({
			 		actionType: WolfConstants.DISPLAY_MESSAGE,
			 		message: obj.msg
		 		});
		 	}
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