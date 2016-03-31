var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var EditQuestion = require('./EditQuestion.react')
var Paper = require('material-ui/lib/paper');
var FloatingActionButton = require('material-ui/lib/floating-action-button');
var FontIcon = require('material-ui/lib/font-icon');

var EditQuiz = React.createClass({
	addQuestion: function() {
		WolfActions.addQuestion();
	},

	render: function() {
		var self = this;
		console.log(this.props);
		if(this.props.quiz.questions.length > 0) {
			var questions = this.props.quiz.questions.map(function(question) {
				console.log(question.number);
				return (
					<div key={question.number}>
						<Paper>
							<EditQuestion 
								number={question.number} />
						</Paper>
						<br/>
					</div>
				);
			});
		} 
		return (
			<div>
				{questions}
				<FloatingActionButton onClick={this.addQuestion} style={{
		       		"position": "fixed",
    				"bottom": "24",
    				"right": "24",
    				"zIndex": "10",
		        	}}>
		        	<FontIcon 
		           		style={{
		              		color:"#FFF",
		           		}}
		           		className="material-icons">
		                   		+
		            </FontIcon>
		        </FloatingActionButton>
			</div>
		);
	}
});

module.exports = EditQuiz;













