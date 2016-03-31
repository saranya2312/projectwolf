var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var Question = require('./Question.react')
var Paper = require('material-ui/lib/paper');

var TakeQuiz = React.createClass({

	render: function() {
		var self = this;
		var questions = this.props.quiz.questions.map(function(question) {
			return (
				<div key={question.s_no}>
					<Paper>
						<Question 
							changeOptions={self.props.changeOptions}
							question={question} />
					</Paper>
					<br/>
				</div>
			);
		});
		return (
			<div>
				{questions}
			</div>
		);
	}
});

module.exports = TakeQuiz;













