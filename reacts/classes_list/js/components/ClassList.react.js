var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');
var WolfConstants = require('../constants/WolfConstants');
var AddClass = require('./AddClass.react');
var AppBar = require('material-ui/lib/app-bar');
var CircularProgress = require('material-ui/lib/circular-progress');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');


var classRedirect = function(id) {
	return function() {
		window.location = '/class/' + id;
  	}
}

function getClassState() {
	return {
		open: false,
		classes: WolfStore.getClasses(),
	};
}

var ClassList = React.createClass({

	getInitialState: function(){
		return getClassState();
	},

	componentDidMount: function() {
		WolfActions.receiveClasses();
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
    	this.setState(getClassState());
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
		    		title="Classes"
		    		onLeftIconButtonTouchTap={this._openLeftNav}/>
				<LeftNav
          			docked={false}
         			width={200}
          			open={this.state.open}
          			onRequestChange={function() { this.setState({open})}}
        		>
        			<img src="/static/leftNavImage.png" width="200"></img>
          			<MenuItem onTouchTap={this._logout}>Logout</MenuItem>
        		</LeftNav>
	        </div>
		)
		if(this.state.classes == WolfConstants.CLASSES_NOT_LOADED) {
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
			var classes = this.state.classes.map(function(cl) {
				console.log(cl.name);
				classOnClick = classRedirect(cl.cid)
				return (
					<ListItem
						key={cl.cid}
        				primaryText={cl.name}
        				onTouchTap={classOnClick} />
				);
			});
			return (
				<div>
				  	{menus}
	    			<List>
						{classes}
					</List>
					<AddClass />
				</div>
			);
		}
	}
});

module.exports = ClassList;













