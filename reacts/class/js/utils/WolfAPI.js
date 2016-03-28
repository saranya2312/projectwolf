var JSON = require('JSON');
var WolfActions = require('../actions/WolfActions');

module.exports = {
	//Login a user
	receiveQuizzes: function(classId, callback) {
		makeCorsRequest(function(responseText, error) {
			if(!error) {
				var result = JSON.parse(responseText);
        var result = {
            success: true,
            name: "CS 4641",
            quizzes: [
              {
                name: "Quiz 1",
                id: 1
              },
              {
                name: "Quiz 2",
                id: 2
              },
              {
                name: "Quiz 3",
                id: 3
              }
            ]
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
function makeCorsRequest(callback) {
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

