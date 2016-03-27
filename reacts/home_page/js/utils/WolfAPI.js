var JSON = require('JSON');
var WolfActions = require('../actions/WolfActions');

module.exports = {
	//Login a user
	login: function(username, password, callback) {
		makeCorsLoginRequest(username, password, function(responseText, error) {
			if(!error) {
				var result = JSON.parse(responseText);
				console.log(result.success);
				if(result.success) {
					//Redirect to class list
					window.location.href = '/classes';
				} else {
					callback(result.msg)
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
function makeCorsLoginRequest(username, password, callback) {
  // All HTML5 Rocks properties support CORS.

  //TODO: Need to fix this once the request is actually there!
  //var url = 'https://ashwyn.pythonanywhere.com/welcome/wolf/login?username=' + username +
  //				'&password=' + password;
  var url = "http://ashwyn.pythonanywhere.com/welcome/wolf/create_user?user_email=vignesh@gatech.edu"

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

