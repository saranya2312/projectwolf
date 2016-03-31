var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	receiveQuizzes: function(classId) {
		WolfAPI.receiveQuizzes(classId, function(obj) {
			console.log(obj);
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_CLASSNAME,
				obj: obj.className
			});
			WolfDispatcher.handleAction({
				actionType: WolfConstants.SET_IS_STUDENT,
				obj: obj.isStudent
			});
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_QUIZZES,
				obj: obj.quizzes
			});
		});
	},

	setDialog: function(bool) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_DIALOG,
			obj: bool
		});
	},

	addQuiz: function(quizName) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_SPINNER,
			obj: true
		});

		WolfAPI.addQuiz(quizName, function(obj) {
			if(obj.success) {
				WolfDispatcher.handleAction({
					actionType: WolfConstants.RECEIVE_QUIZZES,
					obj: obj.quizzes
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
}

module.exports = WolfActions;