var WolfDispatcher = require('../dispatcher/WolfDispatcher');
var EventEmitter = require('events').EventEmitter;
var WolfConstants = require('../constants/WolfConstants');
var _ = require('underscore');

var _classes = WolfConstants.CLASSES_NOT_LOADED;
var _spinner = false;
var _message = '';
var _dialog = false;

function setClasses(classes) {
	_classes = classes;
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

function addClass(cl) {
	var isStudent = cl.useRole == "Student"
	var x =	_classes;
	x[x.length] = {
		name: cl.title,
   		cid: cl.cid,
   		isStudent: isStudent
    }
}

var WolfStore = _.extend({}, EventEmitter.prototype, {
	getClasses: function() {
		return _classes;
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

		case WolfConstants.RECEIVE_CLAS:
			addClass(action.obj);
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
			
		default:
			return true;
	}

	WolfStore.emitChange();
	return true;
});

module.exports = WolfStore;