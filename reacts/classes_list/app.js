window.React = require('react');

var WolfApp = require('./components/WolfApp.react');

React.render(
	<WolfApp />,
	document.getElementById('wolf-app')
);
