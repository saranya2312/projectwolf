var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');

var Result = React.createClass({
	render: function() {
		var self = this;
		var options = this.props.question.options.map(function(option) {
			var percent = option.numResponses / self.props.question.totalAnswered;
			var width = percent * 300
			return (
				<div>
					<p> {option.text} </p> 
					<img src="/static/graph.png" width={width} height="20"></img>
				</div>
			);
		});
		return (
			<div style={{"margin":"10", "paddingBottom":"10", "paddingTop":"10"}}>
				<p> {this.props.question.text} </p>
				{options}
			</div>
		);
	}
});

module.exports = Result;













