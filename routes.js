module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });


    app.get('/classes', function(req, res) {
        res.render('classes.ejs');
    });
};

