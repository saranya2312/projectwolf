window.React = require('react');

var WolfActions = require('./actions/WolfActions');
var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var quizId = $('.quiz-id-span').attr('id');
var classId = $('.class-id-span').attr('id');
WolfActions.receiveQuiz(quizId, classId);

var QuizMain = require('./components/QuizMain.react');

React.render(
	<QuizMain />,
	document.getElementById('wolf-app')
);
