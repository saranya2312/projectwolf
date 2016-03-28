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

	logout: function() {
		//TODO
	},
}

module.exports = WolfActions;