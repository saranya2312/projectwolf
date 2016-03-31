var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');
var WolfConstants = require('../constants/WolfConstants');
var AppBar = require('material-ui/lib/app-bar');
var CircularProgress = require('material-ui/lib/circular-progress');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');
var AddQuiz = require('./AddQuiz.react');


var quizRedirect = function(quizId) {
	return function() {
		var classId = $('.class-id-span').attr('id');
		window.location = '/class/' + classId + '/quiz/' + quizId;
  	}
}

function getQuizState() {
	return {
		open: false,
		class_name: WolfStore.getClassName(),
		quizzes: WolfStore.getQuizzes(),
		isStudent: WolfStore.getIsStudent()
	};
}

var QuizList = React.createClass({

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

	render: function() {
		var menus = (
			<div>
				<AppBar
		    		title={this.state.class_name}
		    		onLeftIconButtonTouchTap={this._openLeftNav}/>
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
		if(this.state.quizzes == WolfConstants.QUIZZES_NOT_LOADED) {
			return (
				<div>
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
			if(!this.state.isStudent) {
				var addQuiz = ( 
					<AddQuiz />
				)
			}
			var quizzes = this.state.quizzes.map(function(quiz) {
				quizOnClick = quizRedirect(quiz.qid)
				return (
					<ListItem
						key={quiz.qid}
        				primaryText={quiz.name}
        				onTouchTap={quizOnClick} />
				);
			});
			return (
				<div>
				  	{menus}
	    			<List>
						{quizzes}
					</List>
					{addQuiz}
				</div>
			);
		}
	}
});

module.exports = QuizList;













