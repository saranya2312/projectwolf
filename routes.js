module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });


    app.get('/classes', function(req, res) {
        res.render('classes.ejs');
    });

    app.get('/class/:id', function(req, res) {
		var class_id = req.params.id;
		console.log(class_id);
		res.render('class.ejs', {
            class_id: class_id,
        });
	});

    app.get('/class/:classid/quiz/:quizid', function(req, res) {
        var class_id = req.params.classId;
        var quiz_id = req.params.quizid;
        console.log(quiz_id);
        res.render('quiz.ejs', {
            quiz_id: quiz_id,
            class_id: class_id
        });
    });

};

