 var JSON = require('JSON');
var WolfActions = require('../actions/WolfActions');
var quizId = $('.quiz-id-span').attr('id');
var classId = $('.class-id-span').attr('id');
var username = $('.username-span').attr('id');

module.exports = {
	receiveQuiz: function(quizId, classId, callback) {
    var url = "http://ashwyn.pythonanywhere.com/welcome/wolf/get_quiz?user_email=" + username;
    url = url + "&qid=" + quizId;
		makeCorsRequest(url, function(responseText, error) {
			if(!error) {
				var result = JSON.parse(responseText);
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
    makeCorsRequest(a, function(responseText, error) {
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
function makeCorsRequest(url, callback) {
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

