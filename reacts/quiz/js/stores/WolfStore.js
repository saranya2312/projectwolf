var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _quiz = WolfConstants.QUIZ_NOT_LOADED;
var _className = "Class"
var _isStudent = false

function setQuiz(quiz) {
	_quiz = quiz;
}

function setClassName(className) {
	_className = className;
}

function setIsStudent(isStudent) {
	_isStudent = isStudent;
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getQuiz: function() {
		return _quiz;
	},

	getClassName: function() {
		return _className;
	},

	getIsStudent: function() {
		return _isStudent;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeChangeListener('change', callback);
	}
});

WolfDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case WolfConstants.RECIEVE_QUIZ:
			setQuiz(action.obj.quiz);
			setClassName(action.obj.className);
			setIsStudent(action.obj.isStudent);
			break;
			
		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;