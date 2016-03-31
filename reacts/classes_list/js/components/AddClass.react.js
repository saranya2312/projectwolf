var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');
var WolfConstants = require('../constants/WolfConstants');
var AppBar = require('material-ui/lib/app-bar');
var CircularProgress = require('material-ui/lib/circular-progress');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var FontIcon = require('material-ui/lib/font-icon');
var RaisedButton = require('material-ui/lib/raised-button');
var FloatingActionButton = require('material-ui/lib/floating-action-button');


function getAddState() {
	return {
		dialog: WolfStore.getDialog(),
		spinner: WolfStore.getSpinner(),
		classcode: '',
		message: WolfStore.getMessage()
	};
}

var AddClass = React.createClass({

	getInitialState: function(){
		return getAddState();
	},

	componentDidMount: function() {
		WolfStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		WolfStore.removeChangeListener(this._onChange);
	},

  	dialogOpen: function() {
    	WolfActions.setDialog(true);
  	},

 	dialogClose: function() {
    	WolfActions.setDialog(false);
  	},

	_onChange: function() {
    	this.setState(getAddState());
  	},

  	handleClassCodeChange: function(e) {
  		this.setState({
			classcode: e.target.value
		});
  	},

  	_addClass: function() {
  		WolfActions.addClass(this.state.classcode);
  	},

	render: function() {
		if(this.state.spinner) {
			var spinner = (
				<div>
	    			<CircularProgress 
	    				style={{
	    					"position": "absolute",
	  						"top": "50%",
	  						"left": "50%",
	  						"marginRight": "-50%",
	    					"transform": "translate(-50%, -50%)"
	    				}}/>
    			</div>
			)
		} 
		var content = (
			<div>
				<p> Enter the class code </p>
				<TextField
	      			onChange={this.handleClassCodeChange}
	      			hintText="burdell123456" />
				<p style={{
					"color":"red",
					"textAlign":"center"
				}}> {this.state.message} </p>
				<br/>
			</div>
		);

		var actions = (
			<RaisedButton label="Done" primary={true} onClick={this._addClass}/>
		);
	
		return (
			<div className="add-button">
		        <FloatingActionButton onClick={this.dialogOpen} style={{
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
		        <Dialog
          			title="Add Class"
          			modal={false}
          			open={this.state.dialog}
          			actions={actions}
          			onRequestClose={this.dialogClose}

        		>
          			{content}
          			{spinner}
        		</Dialog>
		    </div>
		);

	}
});

module.exports = AddClass;













