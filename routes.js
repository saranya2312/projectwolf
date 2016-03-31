module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });


    app.get('/user/:username/classes', function(req, res) {
        res.render('classes.ejs', {
            username: req.params.username
        });
    });

    app.get('/user/:username/class/:id', function(req, res) {
        var username = req.params.username;
		var class_id = req.params.id;
		console.log(class_id);
		res.render('class.ejs', {
            username: username,
            class_id: class_id,
        });
	});

    app.get('/user/:username/class/:classid/quiz/:quizid', function(req, res) {
        var username = req.params.username;
        var class_id = req.params.classId;
        var quiz_id = req.params.quizid;
        console.log(quiz_id);
        res.render('quiz.ejs', {
            username: username,
            quiz_id: quiz_id,
            class_id: class_id
        });
    });

};

