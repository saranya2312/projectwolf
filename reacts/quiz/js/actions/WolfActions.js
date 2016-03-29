var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	receiveQuiz: function(quizId, classId) {
		WolfAPI.receiveQuiz(quizId, classId, function(obj) {
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_QUIZ,
				obj: obj
			});
		});
	},

	submitQuiz: function(obj) {	

	},

	logout: function() {
		//TODO
	},
}

module.exports = WolfActions;