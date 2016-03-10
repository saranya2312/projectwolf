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
		// if (this.state.classes.length == 0) {
		// 	var classes =
		// 		<div>
  //       			<p>  You have no classes. </p>
		// 		</div>
		// } else {
			var classes = this.state.classes;
		    return (
		      <ol>
		        {classes.map(function(cl) {
		          return <li key={cl}>{cl}</li>;
		        })}
		      </ol>
		    );
			// var classes = this.state.classes.map(function(cl) {
			// 	console.log(cl);
			// 	return (
			// 		<li key={cl}> {cl} </li>
			// 	);
			// });
			// return (
			// 	<div>
			// 		{classes}
			// 	</div>
			// );
		// }
	}
});

module.exports = ClassList;













