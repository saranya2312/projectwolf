var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _classes = WolfConstants.CLASSES_NOT_LOADED;

function setClasses(classes) {
	_classes = classes;
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getClasses: function() {
		return _classes;
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
		case WolfConstants.RECEIVE_CLASSES:
			setClasses(action.obj);
			break;
			
		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;