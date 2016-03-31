var JSON = require('JSON');
var WolfActions = require('../actions/WolfActions');

module.exports = {
	//Login a user
	login: function(username, password, callback) {
		makeCorsLoginRequest(username, password, function(responseText, error) {
			if(!error) {
				var result = JSON.parse(responseText);
				if(result.success) {
					//Redirect to class list
          document.cookie = username;
					window.location.href = '/classes';
				} else {
					callback(result.msg)
				}
			} else {
				callback("Login Failed. Please check your internet and try again");
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
  var url = 'http://ashwyn.pythonanywhere.com/welcome/wolf/login?user_email=' + username;
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

