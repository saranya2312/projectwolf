window.React = require('react');
var WolfActions = require('./actions/WolfActions');

var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var classId = $('.class-id-span').attr('id');
WolfActions.receiveQuizzes(classId);

var QuizList = require('./components/QuizList.react');

React.render(
	<QuizList />,
	document.getElementById('wolf-app')
);
