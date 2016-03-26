var Dispatcher = require('flux').Dispatcher;

var WolfDispatcher = new Dispatcher();

WolfDispatcher.handleAction = function(action) {
	this.dispatch({
		source: 'ACTION',
		action: action
	});
}

module.exports = WolfDispatcher;
