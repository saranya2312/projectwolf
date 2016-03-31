var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');
var List = require('material-ui/lib/lists/list');
var CircularProgress = require('material-ui/lib/circular-progress');

var alphabet = "ABCDEFGHIJKL";

function getAddState(number) {
	return {
		dialog: WolfStore.getDialog(number),
		spinner: WolfStore.getSpinner(number),
		message: WolfStore.getMessage(number),
		question: WolfStore.getQuestion(number),
		questiontext: '',
		optionNumber: -1,
	};
}


var changeOption = function(optionNumber, callback) {
	return function() {
		callback(optionNumber);
	};
};

var EditQuestion = React.createClass({

	getInitialState: function(){
		return getAddState(this.props.number);
	},

	componentDidMount: function() {
		WolfStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		WolfStore.removeChangeListener(this._onChange);
	},

  	dialogOpen: function() {
    	WolfActions.setActive(this.props.number);
  	},

 	dialogClose: function() {
    	WolfActions.setActive(-1);
  	},

	_onChange: function() {
    	this.setState(getAddState(this.props.number));
  	},

  	handleOptionChange: function(optionNumber) {
  		this.setState({
  			optionNumber: optionNumber
  		})
  	},

  	handleQuizNameChange: function(e) {
   		this.setState({
		 	questionText: e.target.value
		});
   	},

   	jankMethod: function(e) {
   		var x = this.state.question;
   		x.options[this.state.optionNumber - 1].text = e.target.value;
   		this.setState({question: x});
   	},

   	addOption: function() {
   		var x = this.state.question;
   		var y = this.state.question.options;
   		y[y.length] = {
   			id: y.length,
   			code: alphabet.charAt(y.length),
            text: '',
            numStudents: 0
   		}
   		x.options = y;
   		this.setState({question: x});
   	},

  	_doneEditting: function() {
  		WolfActions.editQuiz(this.state.question);
  	},

	render: function() {
		if(this.state.question) {
			var actions = (
				<RaisedButton label="Done" primary={true} onClick={this._doneEditting}/>
			);
			var self = this;
			var options = this.state.question.options.map(function(option) {
				return (
					<div>
						<TextField
							onChange={self.jankMethod}
							onKeyDown={changeOption(option.id, self.handleOptionChange)}
							defaultValue={option.text}/>
					</div>
				);
			});

			return (
				<div style={{"margin":"10", "paddingBottom":"10", "paddingTop":"10"}}>
					<ListItem onClick={this.dialogOpen} primaryText={this.state.question.text}/>
					<Dialog
	          			modal={false}
	          			open={this.state.dialog}
	          			actions={actions}
	          			onRequestClose={this.dialogClose}>
	          			<TextField
		      				onChange={this.handleQuestionTextChange}
		      				defaultValue={this.state.question.text} 
		      				floatingLabelText="Enter Question"/>
		      			<List>
		      				<ListItem primaryText="Options" disabled={true} />
		      				{options}
		      				<ListItem primaryText=" + Add Option"
		      					onClick={this.addOption}/>
	      				</List>
	          		</Dialog>
				</div>
			);
		} else {
			return (
				<CircularProgress 
	    			style={{
	    				"position": "absolute",
	  					"top": "50%",
	  					"left": "50%",
	  					"marginRight": "-50%",
	    				"transform": "translate(-50%, -50%)"
	    		}}/>
	    	);
		}
	}
});

module.exports = EditQuestion;













