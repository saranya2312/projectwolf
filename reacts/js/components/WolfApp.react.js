var React = require('react');
var WolfStore = require('../stores/WolfStore');
var ClassList = require('./ClassList.react');
var LoginForm = require('./LoginForm.react');

function getAppState() {
	return {
		status: WolfStore.getStatus()
	};
}

var WolfApp = React.createClass({

	getInitialState: function() {
		return getAppState();
	},

	componentDidMount: function() {
		WolfStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		WolfStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getAppState());
  	},

	render: function() {
		if(this.state.status) {
			return (
				<div>
					<ClassList />
				</div>
			);
		} else {
			return (
				<div>
					<LoginForm />
				</div>
			);
		}
	}
});

module.exports = WolfApp;