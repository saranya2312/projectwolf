var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _quizzes = WolfConstants.QUIZZES_NOT_LOADED;
var _className = "Quizzes";
var _isStudent = false;
var _spinner = false;
var _message = '';
var _dialog = false;

function setQuizzes(quizzes) {
	_quizzes = quizzes;
}

function setClassName(className) {
	_className = className;
}

function setSpinner(bool) {
	_spinner = bool;
}

function setMessage(message) {
	_message = message;
}

function setDialog(dialog) {
	_dialog = dialog;
}

function setIsStudent(bool) {
	_isStudent = bool;
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getQuizzes: function() {
		return _quizzes;
	},

	getSpinner: function() {
		return _spinner;
	},

	getMessage: function() {
		return _message;
	},

	getDialog: function() {
		return _dialog;
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
		case WolfConstants.RECEIVE_QUIZZES:
			setQuizzes(action.obj);
			break;
		
		case WolfConstants.RECEIVE_CLASSNAME:
			setClassName(action.obj);
			break;
		
		case WolfConstants.SET_SPINNER:
			setSpinner(action.obj);
			break;

		case WolfConstants.SET_MESSAGE:
			setMessage(action.obj);
			break;

		case WolfConstants.SET_DIALOG:
			setDialog(action.obj);
			break;

		case WolfConstants.SET_IS_STUDENT:
			setIsStudent(action.obj);
			break;

		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;