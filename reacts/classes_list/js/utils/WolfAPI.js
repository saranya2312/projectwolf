var JSON = require('JSON');
var WolfActions = require('../actions/WolfActions');

var username = $('.username-span').attr('id');

module.exports = {
	//Login a user
	receiveClasses: function(callback) {
    console.log(username);
    var url = "http://ashwyn.pythonanywhere.com/welcome/wolf/get_classes_?user_email=" + username;
		makeCorsRequest(url, function(responseText, error) {
			if(!error) {
				var result = JSON.parse(responseText);
        if(result.success) {
				  callback(result);
        } else {
          window.location.href = '/';
        }
			} else {
        console.log("CORS Failed. Redirect to login.");
        window.location.href = '/';
			}
		});
	},

  addClass: function(classCode, callback) {
    var url = "http://ashwyn.pythonanywhere.com/welcome/wolf/add_class?user_email=" + username;
    url = url + "&cid=" + classCode
    makeCorsRequest(url, function(responseText, error) {
      if(!error) {
        var result = JSON.parse(responseText);
        callback(result)
      } else {
        console.log('CORS Failed. Redirect to login.')
        callback({
          success: false,
          message: "Could not add quiz. Check your connection and try again."
        })
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
  // All HTML5 Rocks properties support CORS.

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

