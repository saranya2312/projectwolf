var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');
var AppBar = require('material-ui/lib/app-bar');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');


function getLoginState() {
	return {
		message: WolfStore.getMessage(),
		username: "",
		password: ""
	};
}

var LoginForm = React.createClass({

	getInitialState: function(){
		return getLoginState();
	},

	componentDidMount: function() {
		WolfStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		WolfStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState({message: WolfStore.getMessage()});
  	},

	_validateEmail: function(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	},

	handleUsernameChange: function(e){
		this.setState({
			username: e.target.value
		});
	},

	handlePasswordChange: function(e){
		this.setState({
			password: e.target.value
		});
	},

	_login: function() {
		if(!this._validateEmail(this.state.username)) {
			WolfActions.setMessage("Please enter a valid email and try again");
		} else {
			WolfActions.login(this.state.username, this.state.password);
		}
	},

	render: function() {
		// login mode:
		return (
			<div className="login-form">
				<AppBar
	    			title="Project Wolf Login"/>
	    		<div style={{
    						"position": "absolute",
  							"top": "50%",
  							"left": "50%",
  							"marginRight": "-50%",
    						"transform": "translate(-50%, -50%)"
    					}}>
		    		<TextField
		    			onChange={this.handleUsernameChange}
	      				floatingLabelText="Enter Gatech Email"/>
	      			<br/>
	      			<TextField
	      				onChange={this.handlePasswordChange}
	      				floatingLabelText="Password"
	      				type="password"/>
					<p style={{"color":"red"}}> {this.state.message} </p>
					<br/>
					<RaisedButton label="Login" primary={true} onClick={this._login}/>
				</div>
			</div>
		);
	}
});

module.exports = LoginForm;













