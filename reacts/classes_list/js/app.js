window.React = require('react');
ReactDOM = require('react-dom');

var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
var ClassList = require('./components/ClassList.react');

ReactDOM.render(
	<ClassList />,
	document.getElementById('wolf-app')
);
