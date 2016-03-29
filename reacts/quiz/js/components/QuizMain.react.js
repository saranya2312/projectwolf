var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');
var WolfConstants = require('../constants/WolfConstants');
var TakeQuiz = require('./TakeQuiz.react.js');
var QuizResults = require('./QuizResults.react.js');
var AppBar = require('material-ui/lib/app-bar');
var CircularProgress = require('material-ui/lib/circular-progress');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');
var RaisedButton = require('material-ui/lib/raised-button');


function getQuizState() {
	return {
		answers: {},
		open: false,
		isStudent: WolfStore.getIsStudent(),
		className: WolfStore.getClassName(),
		quiz: WolfStore.getQuiz(),
	};
}

var QuizMain = React.createClass({

	getInitialState: function(){
		return getQuizState();
	},

	componentDidMount: function() {
		WolfStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		WolfStore.removeChangeListener(this._onChange);
	},

	handleToggle: function() {
		this.setState({open: !this.state.open});
	},

  	handleClose: function() {
  		this.setState({open: false});	
  	},

	_onChange: function() {
    	this.setState(getQuizState());
  	},

  	_logout: function() {
  		WolfActions.logout();
  	},

  	_openLeftNav: function() {
  		this.setState({open: true});
  	},

  	_changeOptions: function(questionNumber, answer) {
  		this.state.answers[questionNumber] = answer;
  	},

  	_submitQuiz: function() {
  		WolfActions.submitQuiz(this.state.answers);
  	},

  	_endQuiz:function() {
  		WolfActions.endQuiz();
  	},

	render: function() {
		var menus = (
			<div>
				<LeftNav
          			docked={false}
         			width={200}
          			open={this.state.open}
          			onRequestChange={this.handleToggle}
        		>
        			<img src="/static/leftNavImage.png" width="200"></img>
          			<MenuItem onTouchTap={this._logout}>Logout</MenuItem>
        		</LeftNav>
	        </div>
		)
		if(this.state.quiz == WolfConstants.QUIZ_NOT_LOADED) {
			return (
				<div>
					<AppBar
		    			title="Quiz"
		    			onLeftIconButtonTouchTap={this._openLeftNav}/>
						{menus}
    				<CircularProgress 
    					style={{
    						"position": "absolute",
  							"top": "50%",
  							"left": "50%",
  							"marginRight": "-50%",
    						"transform": "translate(-50%, -50%)"
    					}}/>
    			</div>
			);
		} else {
			var heading = this.state.className + " --> " + this.state.quiz.name

			//STUDENT VIEWS
			if(this.state.isStudent && this.state.quiz.inProgress) {
				var quiz = (
					<div style={{"margin":"10"}}>
						<TakeQuiz quiz={this.state.quiz} changeOptions={this._changeOptions}/>
						<RaisedButton label="Submit" primary={true} onClick={this._submitQuiz}/>
					</div>
				)
			} else if(this.state.isStudent && !this.state.quiz.inProgress && !this.state.quiz.isDone) {
				var quiz = (
					<p style={{
							"color": "grey",
    						"position": "absolute",
  							"top": "50%",
  							"left": "50%",
  							"marginRight": "-50%",
    						"transform": "translate(-50%, -50%)"
    					}}>
    					This quiz is not open.
    				</p>
				)
			} else if(this.state.isStudent && !this.state.quiz.isProgress && this.state.quiz.isDone) {
				var quiz = (
					<div style={{
							"color": "grey",
    						"position": "absolute",
  							"top": "50%",
  							"left": "50%",
  							"marginRight": "-50%",
    						"transform": "translate(-50%, -50%)"
    					}}>
						<p> This quiz has already occurred. </p>
						<p> You may not take it at this time </p>
					</div>
				)

			//PROFESSOR VIEWS
			} else if(!this.state.isStudent && this.state.quiz.isProgress) {
				var quiz = (
					<div style={{
							"color": "grey",
    						"position": "absolute",
  							"top": "50%",
  							"left": "50%",
  							"marginRight": "-50%",
    						"transform": "translate(-50%, -50%)"
    					}}>
						<p> This quiz is currently in progress. </p>
						<p> You may not edit at this time </p>
						<RaisedButton label="End Quiz" primary={true} onClick={this._endQuiz}/>
					</div>
				)
			} if(!this.state.isStudent && !this.state.quiz.isProgress && this.state.quiz.isDone || true) {
				//TODO
				var quiz = (
					<div style={{"margin":"10"}}>
						<QuizResults questions={this.state.quiz.questions} />
					</div>
				)
			} else if(!this.state.isStudent && !this.state.quiz.isProgress && !this.state.quiz.isDone) {
				//TODO
				var quiz = {}
			}

			return (
				<div>
					<AppBar
		    		title={heading}
		    		onLeftIconButtonTouchTap={this._openLeftNav}/>
				  	{menus}
				  	{quiz}
				</div>
			);
		}
	}
});

module.exports = QuizMain;














