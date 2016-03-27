var React = require('react');
var ReactDOM = require("react-dom")
var WolfActions = require('../actions/WolfActions');
var WolfStore = require('../stores/WolfStore');
var WolfConstants = require('../constants/WolfConstants');
var AppBar = require('material-ui/lib/app-bar');
var CircularProgress = require('material-ui/lib/circular-progress');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');


var classRedirect = function(id) {
	return function() {
		window.location = '/class?id=' + id;
  	}
}

function getClassState() {
	return {
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

	_onChange: function() {
    	this.setState(getClassState());
  	},

	render: function() {

		if(this.state.classes == WolfConstants.CLASSES_NOT_LOADED) {
			return (
				<div>
  					<AppBar
	    				title="Classes"/>
    				<CircularProgress 
    					style={{
    						"position": "absolute",
  							"top": "50%",
  							"left": "50%"
    					}}/>
    			</div>
			);
		} else {
			var classes = this.state.classes.map(function(cl) {
				console.log(cl.name);
				classOnClick = classRedirect(cl.id)
				return (
					<ListItem
						key={cl.id}
        				primaryText={cl.name}
        				onTouchTap={classOnClick} />
				);
			});
			return (
				<div>
				  	<AppBar
	    				title="Classes"/>
	    			<List>
						{classes}
					</List>
				</div>
			);
		}
	}
});

module.exports = ClassList;













