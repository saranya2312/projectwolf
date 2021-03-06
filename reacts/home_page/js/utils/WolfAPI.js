var JSON = require('JSON');
var WolfActions = require('../actions/WolfActions');

module.exports = {
	//Login a user
	login: function(username, callback) {
    var url = ' https://ashwyn.pythonanywhere.com/welcome/wolf/isLoggedIn?user_email=' + username;
		makeCorsRequest(url, function(responseText, error) {
			if(!error) {
				var result = JSON.parse(responseText);
				if(result.success) {
					//Redirect to class list
					window.location.href = '/user/' + username + '/classes';
				} else {
					callback(result.msg)
				}
			} else {
				callback("Login Failed. Please check your internet and try again");
			}
		});

	},

  register: function(username, macAddress, callback) {
      var url = 'https://ashwyn.pythonanywhere.com/welcome/wolf/verify_user?user_email=' + encodeURIComponent(username);
      url = url + "&btId=" + encodeURIComponent(macAddress);
      makeCorsRequest(url, function(responseText, error) {
        if(!error) {
          var result = JSON.parse(responseText);
          callback(result);
        } else {
          callback(
            {
              msg:"Registration Failed. Please check your internet and try again"
            }
          );
        }
      });
  },

  otp: function(username, otp, callback) {
    var url = 'https://ashwyn.pythonanywhere.com/welcome/wolf/verify_user_otp?user_email=' + username + '&otp=' + otp
      makeCorsRequest(url, function(responseText, error) {
        if(!error) {
          var result = JSON.parse(responseText);
          callback(result);
        } else {
          callback(
            {
              msg:"OTP Authentication Failed. Please check your internet and try again"
            }
          );
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
  // All HTML5 Rocks properties support CORS
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

