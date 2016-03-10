var React = require('react');
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');


function getClassState() {
	return {
		classes: WolfStore.getClasses(),
	};
}

var ClassList = React.createClass({

	getInitialState: function(){
		return getClassState();
	},

	componentDidMount: function() {
		WolfStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		WolfStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getClassState());
  	},

	render: function() {
		var classes = this.state.classes.map(function(cl) {
				console.log(cl);
				return (
					<li key={cl}> {cl} </li>
				);
			});
		return (
			<div>
				<h1> CLASSES </h1>
				{classes}
			</div>
		);

	}
});

module.exports = ClassList;













