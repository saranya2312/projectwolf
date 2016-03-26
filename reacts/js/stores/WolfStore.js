var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _message = "";
var _status = false;
var _classes = [];

function setMessage(message) {
	_message = message;
}

function setClasses(classes) {
	console.log(classes);
	_classes = classes;
}

function setStatus(status) {
	_status = status;
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getMessage: function() {
		return _message;
	},

	getClasses: function() {
		return _classes;
	},

	getStatus: function() {
		return _status;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		//this.removeChangeListener('change', callback);
	}
});

WolfDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case WolfConstants.RECEIVE_LOGIN_STATUS:
			setStatus(action.status);
			setMessage(action.message);
			break;

		case WolfConstants.RECEIVE_CLASSES:
			setClasses(action.classes);
			break;

		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;