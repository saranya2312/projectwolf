var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfConstants = require('../constants/WolfConstants');
var WolfStore = require('../stores/WolfStore');
var AppBar = require('material-ui/lib/app-bar');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');


function getLoginState() {
	return {
		isLogin: WolfStore.getIsLogin(),
		message: WolfStore.getMessage(),
		username: "",
		macAddress: "",
		otp: ""
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
    	this.setState({
    		isLogin: WolfStore.getIsLogin(),
			message: WolfStore.getMessage()
		});
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

	handleMacAddressChange: function(e){
		this.setState({
			macAddress: e.target.value
		});
	},

	handleOTPChange: function(e){
		this.setState({
			otp: e.target.value
		});
	},

	_login: function() {
		if(!this._validateEmail(this.state.username)) {
			WolfActions.setMessage("Please enter a valid email and try again");
		} else {
			WolfActions.login(this.state.username);
		}
	},

	_register: function() {
		if(!this._validateEmail(this.state.username)) {
			WolfActions.setMessage("Please enter a valid email and try again");
		} else {
			WolfActions.register(this.state.username, this.state.macAddress);
		}
	},

	_toLoginPage: function() {
		WolfActions.setIsLogin(WolfConstants.IS_LOGIN);
	},

	_toRegistrationPage: function() {
		WolfActions.setIsLogin(WolfConstants.IS_REGISTRATION);
	},

	_otp: function() {
		WolfActions.otp(this.state.username, this.state.otp);
	},

	_dialog: function() {
		WolfActions.okay();
	},

	render: function() {
		//login mode:
		if(this.state.isLogin == WolfConstants.IS_LOGIN) {
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
	    				<p style={{'color':'#E91E63', 'textAlign':'center'}}> Before you login please turn on your Bluetooth, </p>
	    				<p style={{'color':'#E91E63', 'textAlign':'center'}}> set your phone to be discoverable and </p>
	    				<p style={{'color':'#E91E63', 'textAlign':'center'}}> wait for your name to appear on screen. </p>
			    		<TextField
			    			onChange={this.handleUsernameChange}
		      				floatingLabelText="Enter Email"/>
		      			<br/>
						<p style={{"color":"red"}}> {this.state.message} </p>
						<br/>
						<div style={{"textAlign":"center"}}>
							<RaisedButton label="Login" primary={true} onClick={this._login}/>
						</div>
						<p onClick={this._toRegistrationPage} 
							style={{
								"color":"grey",
								"textAlign": "center"
								}} > New User? Click Here</p>
					</div>
				</div>
			);
		} else if(this.state.isLogin == WolfConstants.IS_REGISTRATION) {
			return (
				<div className="registration-form">
					<AppBar
		    			title="Project Wolf Registration"/>
		    		<div style={{
	    						"position": "absolute",
	  							"top": "50%",
	  							"left": "50%",
	  							"marginRight": "-50%",
	    						"transform": "translate(-50%, -50%)"
	    					}}>
			    		<TextField
			    			onChange={this.handleUsernameChange}
		      				floatingLabelText="Enter Email"/>
		      			<br/>
		      			<TextField
		      				onChange={this.handleMacAddressChange}
		      				floatingLabelText="Enter MAC Address of your Device"
		      				type="password"/>
						<p style={{"color":"red"}}> {this.state.message} </p>
						<br/>
						<div style={{"textAlign":"center"}}>
							<RaisedButton label="Register" primary={true} onClick={this._register}/>
						</div>
						<p onClick={this._toLoginPage} style={{
								"color":"grey",
								"textAlign": "center"
								}}> Already registered? </p>
					</div>
				</div> 
			);
		} else if(this.state.isLogin == WolfConstants.IS_DIALOG) {
			return (
				<div className="submission-form">
					<AppBar
		    			title="Project Wolf Login"/>
		    		<div style={{
	    						"position": "absolute",
	  							"top": "50%",
	  							"left": "50%",
	  							"marginRight": "-50%",
	    						"transform": "translate(-50%, -50%)"
	    					}}>
	    				<div style={{"textAlign":"center"}}>
	    					<p > You have signed up successfully. Please click the button below to login. </p>
							<RaisedButton label="Submit" primary={true} onClick={this._dialog}/>
						</div>
						
					</div> 
				</div>
			);
		} else if(this.state.isLogin == WolfConstants.IS_OTP) {
			return (
				<div>
					<AppBar
			    		title="Project Wolf OTP"/>
			    	<div style={{
	    						"position": "absolute",
	  							"top": "50%",
	  							"left": "50%",
	  							"marginRight": "-50%",
	    						"transform": "translate(-50%, -50%)"
	    					}}>
	    				<p style={{"textAlign":"center"}}> You will receive a one time password on your email. Please enter the passsword you received. </p>
	    				<div style={{"width": "50%", "margin": "0 auto" }}>
			    			<TextField
				    			onChange={this.handleOTPChange}
		      					floatingLabelText="Enter One Time Password"/>
		      			</div>
		      			<br/>
		      			<p style={{"textAlign":"center","color":"red"}}> {this.state.message} </p>
						<br/>
						<div style={{"textAlign":"center"}}>
							<RaisedButton label="Submit" primary={true} onClick={this._otp}/>
						</div>
						<p onClick={this._toLoginPage} style={{
								"color":"grey",
								"textAlign": "center"
								}}> Already registered? </p>
					</div>
				</div> 
			);
		}
	}
});

module.exports = LoginForm;













