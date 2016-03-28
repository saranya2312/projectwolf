var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	receiveQuizzes: function(classId) {
		WolfAPI.receiveQuizzes(classId, function(obj) {
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_CLASSNAME,
				obj: obj.name
			});
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_QUIZZES,
				obj: obj.quizzes
			});

		});
	},
}

module.exports = WolfActions;