var query = getUrlParameter("q");
var input = document.getElementById("search-input");
var result = document.getElementById("search-result");
var search = [];

if(query) {
	input.value = query;
}

var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
xhr.open("GET", "/search.json");
xhr.onreadystatechange = function() {
  if (xhr.readyState > 3) {
    if (xhr.status == 200) {
	    search = JSON.parse(xhr.responseText);
	  }
	  searchFor(input.value);
  }
};
xhr.send();

input.oninput = function() {
	window.history.replaceState({}, "", "?q="+input.value);
  searchFor(input.value);
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function searchFor(query) {
	var pattern = /(title|tag):("[^"]*"|[^\s]+)|("[^"]*"|[^\s]+)/gi;

	for(var i = 0; i < search.length; i++) {
		search[i].weight = 0;
	}

	while (match = pattern.exec(query.toLowerCase())) {
		for(var i = 0; i < search.length; i++) {
			switch(match[1]) {
				case "title":
					search[i].weight += getMatches(match[2], search[i].title) * 10;
					break;
				case "tag":
					search[i].weight += getMatches(match[2], search[i].tags) * 5;
					break;
				default:
					search[i].weight += getMatches(match[3], search[i].title) * 10;
					search[i].weight += getMatches(match[3], search[i].tags) * 5;
					search[i].weight += getMatches(match[3], search[i].content);
					break;
			}
		}
	}

	search.sort(function(a, b){ return b.weight - a.weight });
	result.innerHTML = "";

	for(var i = 0; i < search.length; i++) {
		if(search[i].weight == 0) { break; }
		result.innerHTML += search[i].html.replace(/(href="[^"]*)"/i, "$1?highlight=" + encodeURIComponent(query) + "\"");
	}
}

function getMatches(query, text) {
	var result = 0;
	var isValid = true;
	query = query.replace(/['’]/g, "['’]"); // allow different apostrophe chars
	query = query.replace(/"/g, ""); // remove quotes

	try {
	  var regex = new RegExp(query, "gi");
	} catch {
		isValid = false;
	}

	if(isValid) {
		result = (text.match(regex) || []).length;
	}

	return result;
}