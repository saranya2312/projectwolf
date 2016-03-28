var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _quizzes = WolfConstants.QUIZZES_NOT_LOADED;
var _className = "Quizzes"

function setQuizzes(quizzes) {
	_quizzes = quizzes;
}

function setClassName(className) {
	_className = className;
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getQuizzes: function() {
		return _quizzes;
	},

	getClassName: function() {
		return _className;
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
			
		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;