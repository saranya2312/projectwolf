var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _quiz = WolfConstants.QUIZ_NOT_LOADED;
var _className = "Class"
var _isStudent = false
var _spinner = false;
var _message = '';
var _dialog = false;
var _active = -1;
var _submitError = '';


function setSubmitError(error) {
	_submitError = error;
}

function setQuiz(quiz) {
	_quiz = quiz;
}

function setClassName(className) {
	_className = className;
}

function setIsStudent(isStudent) {
	_isStudent = isStudent;
}

function setSpinner(bool) {
	_spinner = bool;
}

function setMessage(message) {
	_message = message;
}

function setActive(num) {
	_active = num;
}

function addQuestion() {
	console.log(_quiz);
	var x = _quiz;
   	var y = x.questions;
   	y[y.length] = {
   		text: "Enter question text",
   		number: y.length + 1,
        options: [],
        correctOption: '',
        numAnswered: 0
   	}
   	x.questions = y;
   	_quiz = x;
	_active = y.length;
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

	getSubmitError: function() {
		return _submitError;
	},

	getQuestion: function(num) {
		console.log(_quiz.questions[num-1])
		return _quiz.questions[num-1];
	},

	getSpinner: function(num) {
		if (_active == num) {
			return _spinner;
		} else {
			return false;
		}
	},

	getMessage: function(num) {
		if (_active == num) {
			return _message;
		} else {
			return '';
		}
	},

	getDialog: function(num) {
		return _active == num;
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
		case WolfConstants.RECEIVE_QUIZ:
			setQuiz(action.obj);
			setClassName(action.obj.className);
			setIsStudent(action.obj.isStudent);
			break;
		
		case WolfConstants.SET_SPINNER:
			setSpinner(action.obj);
			break;

		case WolfConstants.SET_SUBMIT_ERROR:
			setSubmitError(action.obj);
			break;

		case WolfConstants.ADD_QUESTION:
			addQuestion();
			break;

		case WolfConstants.SET_MESSAGE:
			setMessage(action.obj);
			break;

		case WolfConstants.SET_ACTIVE:
			setActive(action.obj);
			break;

		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;