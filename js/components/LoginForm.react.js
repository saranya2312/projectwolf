var React = require('react');
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');


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
		WolfActions.login(this.state.username, this.state.password);
	},

	render: function() {
		// login mode:
		return (
			<div className="login-form">
				<h1> Login </h1>
	            <div className="login-email">
	            	<p> Username </p>
				    <input
				    	onChange={this.handleUsernameChange}
						type='text'
						name="Username"
						ref = 'username' >
					</input>
					<br></br>
					<p> Password </p>
					<input
						onChange={this.handlePasswordChange}
						type='password'
						name="Password"
						ref = 'password' >
					</input>
				</div>
				<p> {this.state.message} </p>
				<br></br>
				<button type="button" onClick={this._login}> Login </button>
			</div>
		);
	}
});

module.exports = LoginForm;













