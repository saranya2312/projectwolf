 var JSON = require('JSON');
var WolfActions = require('../actions/WolfActions');
var quizId = $('.quiz-id-span').attr('id');
var classId = $('.class-id-span').attr('id');


module.exports = {
	receiveQuiz: function(quizId, classId, callback) {
		makeCorsRequest(quizId, classId, function(responseText, error) {
			if(!error) {
				var result = JSON.parse(responseText);
        var result = {
            success: true,
            isStudent: false,
            className: "CS4641",
            quiz: {
              inProgress: false,
              isDone: false,
              dependsOnLocation: true,
              name: "Quiz 1",
              buildingName: "Skiles",
              questions: [
                  {
                      text: "Are you here?",
                      number: 1,
                      options: [
                          {
                              id: 1,
                              code: "A",
                              text: "Yes",
                              numStudents: 15,
                          },
                          {
                              code: "B",
                              id: 2,
                              numStudents: 30,
                              text: "No"
                          }
                      ],
                      correctOption: "A",
                      totalAnswered: 45,
                      //The results can be empty until the quiz is closed.
                  }
              ]
            }
        }
        if(result.success) {
				  callback(result);
        } else {
          window.location.href = '/';
        }
			} else {
				console.log("Some crazy business happened here and CORS failed");
			}
		});
	},

  editQuiz: function(quiz, callback) {
    makeCorsRequest(classId, quizId, function(responseText, error) {
      if(!error) {
        var result = JSON.parse(responseText);
        var result = {
            success: true,
        }
        callback(result)
      } else {
        console.log("Some crazy business happened here and CORS failed");
      }
    });
  }
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(quizId, classId, callback) {
  // All HTML5 Rocks properties support CORS.

  //TODO: Need to get the right end point here
  var url = "http://ashwyn.pythonanywhere.com/welcome/wolf/get_classes?user_email=ashwyn@gatech.edu"

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    console.log('Response from CORS request to ' + url + ': ' + text);
    callback(text, false);
  };

  xhr.onerror = function() {
  	callback('', true);
  };

  xhr.send();
}

