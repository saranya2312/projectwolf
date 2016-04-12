var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var WolfConstants = require('../constants/WolfConstants');
var WolfAPI = require('../utils/WolfAPI');

var WolfActions = {
	receiveQuiz: function(quizId, classId) {
		WolfAPI.receiveQuiz(quizId, classId, function(obj) {
			console.log(obj);
			WolfDispatcher.handleAction({
				actionType: WolfConstants.RECEIVE_QUIZ,
				obj: obj
			});
		});
	},

	addQuestion: function() {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.ADD_QUESTION,
		});
	},

	setActive: function(num) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_ACTIVE,
			obj: num
		})
	},

	setActive: function(num) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_ACTIVE,
			obj: num
		})
	},

	setMessage: function(message) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_MESSAGE,
			obj: message
		});
	},

	setSpinner: function(bool) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_SPINNER,
			obj: bool
		});
	},

	editQuiz: function(quiz) {
		// console.log(quiz);
		// this.setSpinner(true);
		// var self = this;
		// WolfAPI.editQuiz(quiz, function(obj) {
		// 	if(obj.success) {
		// 		// WolfDispatcher.handleAction({
		// 		// 	actionType: WolfConstants.RECEIVE_QUIZ,
		// 		// 	obj: obj
		// 		// });
		// 		self.setActive(-1);
		// 	} else {
		// 		self.setMessage(obj.msg);
		// 	}
		// 	self.setSpinner(false);
		// });
	},

	submitQuiz: function(obj) {	
		var self = this;
		WolfAPI.submitQuiz(obj, function(obj) {
			if(obj.success) {
				self.setDialogMessage(WolfConstants.QUIZ_SUBMITTED);
			} else {
				self.setMessage(msg);
			}
		});
	},

	setDialogMessage: function(bool) {
		WolfDispatcher.handleAction({
			actionType: WolfConstants.SET_DIALOG_MESSAGE,
			obj: bool
		});
	},


	endQuiz: function() {	
		var self = this;
		WolfAPI.endQuiz(function(obj) {
			if(obj.success) {
				//TODO
			} else {
				self.setMessage(obj.message);
			}
		});
	},

	startQuiz: function() {
		var self = this;
		WolfAPI.endQuiz(function(obj) {
			if(obj.success) {
				//TODO
			} else {
				self.setMessage(obj.message);
			}
		});
	},

	logout: function() {
		WolfAPI.logout();
	},
}

module.exports = WolfActions;