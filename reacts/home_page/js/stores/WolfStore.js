var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _message = "";
var _isLogin = WolfConstants.IS_LOGIN;

function setDialog(bool) {
	_dialog = bool;
}

function setIsLogin(bool) {
	_isLogin = bool;
}

function setMessage(message) {
	_message = message;
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getMessage: function() {
		return _message;
	},

	getIsLogin: function() {
		return _isLogin;
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
		case WolfConstants.DISPLAY_MESSAGE:
			setMessage(action.message);
			break;

		case WolfConstants.SET_IS_LOGIN:
			setIsLogin(action.bool);
			break;
			
		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;