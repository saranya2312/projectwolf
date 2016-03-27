var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _message = "";

function setMessage(message) {
	_message = message;
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getMessage: function() {
		return _message;
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
		case WolfConstants.DISPLAY_MESSAGE:
			setMessage(action.message);
			break;
			
		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;