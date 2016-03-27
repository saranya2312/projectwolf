window.React = require('react');

var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var ClassList = require('./components/ClassList.react');

React.render(
	<ClassList />,
	document.getElementById('wolf-app')
);
