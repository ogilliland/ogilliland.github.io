var query = getUrlParameter("highlight");

init(query);

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function init(query) {
	var pattern = /(title|tag):("[^"]*"|[^\s]+)|("[^"]*"|[^\s]+)/gi;

	while (match = pattern.exec(query.toLowerCase())) {
		switch(match[1]) {
			case "title":
				highlight(match[2], document.querySelectorAll("h1"));
				break;
			case "tag":
				highlight(match[2], document.querySelectorAll(".page__tag"));
				break;
			default:
				highlight(match[3], document.querySelectorAll("h1, .page__tag, p, h2, h3"));
				break;
		}
	}
}

function highlight(term, elements) {
	var isValid = true;
	term = term.replace(/"/g, ""); // remove quotes

	// strip html
	term = term.replace(/</g, "&lt;");
	term = term.replace(/>/g, "&gt;");

	try {
	  var regex = new RegExp("(<[^>]*>)|(" + term + ")", "gi");
	} catch {
		isValid = false;
	}

	if(isValid && term.length > 0) {
		for(var i = 0; i < elements.length; i++) {
			elements[i].innerHTML = elements[i].innerHTML.replace(regex, "$1<span class=\"attn\">$2</span>"); // highlight
			elements[i].innerHTML = elements[i].innerHTML.replace(/<span class=\"attn\"><\/span>/gi, ""); // remove empty spans
		}
	}
}