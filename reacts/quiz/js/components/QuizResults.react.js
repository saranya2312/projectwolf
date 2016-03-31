var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var Result = require('./Result.react')
var Paper = require('material-ui/lib/paper');

var QuizResults = React.createClass({

	render: function() {
		var self = this;
		var results = this.props.questions.map(function(question) {
			return (
				<div key={question.s_no}>
					<Paper>
						<Result
							question={question} />
					</Paper>
					<br/>
				</div>
			);
		});
		return (
			<div>
				{results}
			</div>
		);
	}
});

module.exports = QuizResults;













