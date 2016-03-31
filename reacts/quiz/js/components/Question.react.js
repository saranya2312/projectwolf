var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');


var changeOption = function(answerValue, questionNumber, callback) {
	return function() {
		callback(questionNumber, answerValue);
	};
};

var Question = React.createClass({
	render: function() {
		var self = this;
		var options = this.props.question.options.map(function(option) {
			return (
				<RadioButton
					key={option.oid}
					onClick={changeOption(option.code, self.props.question.number, self.props.changeOptions)}
    				value={option.code}
    				label={option.text}/>
        	);
		});
		var refs = "Question" + this.props.question.number
		return (
			<div style={{"margin":"10", "paddingBottom":"10", "paddingTop":"10"}}>
				<p> {this.props.question.text} </p>
				<RadioButtonGroup name={refs} ref={refs}>
					{options}
				</RadioButtonGroup>
			</div>
		);
	}
});

module.exports = Question;













