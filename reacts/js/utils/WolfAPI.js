var WolfActions = require('../actions/WolfActions');

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}


module.exports = {

	//Login a user
	login: function(username, password, callback) {
		var url = "http://ashwyn.pythonanywhere.com/welcome/wolf/create_user?user_email=" + username;
		var obj = {"msg": "Login successful!", "success": true}
		callback(obj);
	},

	getClasses: function(username, callback) {
		//TODO: HIT END POINT
		var classes = ["CS 7641", "CS 6675", "CS 7616", "CS 7650"];
		callback(classes);
	}
}
