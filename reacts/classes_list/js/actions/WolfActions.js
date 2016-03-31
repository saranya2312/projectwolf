var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	receiveClasses: function() {
		WolfAPI.receiveClasses(function(obj) {
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_CLASSES,
				obj: obj.classes
			});
		});
	},

	setDialog: function(bool) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_DIALOG,
			obj: bool
		});
	},

	addClass: function(classCode) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_SPINNER,
			obj: true
		});

		WolfAPI.addClass(classCode, function(obj) {
			if(obj.success) {
				WolfDispatcher.handleAction({
					actionType: WolfConstants.RECEIVE_CLASS,
					obj: obj
				});
				WolfDispatcher.handleAction({
					actionType: WolfConstants.SET_DIALOG,
					obj: false
				});
			} else {
				WolfDispatcher.handleAction({
					actionType: WolfConstants.SET_MESSAGE,
					obj: obj.msg
				});
			}
			WolfDispatcher.handleAction({
				actionType: WolfConstants.SET_SPINNER,
				obj: false
			});
		});
	},

	logout: function() {
		document.cookie = "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		//TODO: Hit API endpoint for logout
		console.log(document.cookie);
		window.location.href = '/';
	},
}

module.exports = WolfActions;