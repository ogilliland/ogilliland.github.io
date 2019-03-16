var sections, scroll;
var fullscreen = false;
var animating = false;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/* AJAX PAGE TRANSITIONS */
function preload(url, history) { // TO DO - cancel preload if user navigates back again before completion
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3) {
      if (xhr.status == 200 || xhr.status == 404) {
        // update page
        document.title = xhr.responseText.match(/<title>(.*)<\/title>/is)[1];
        if (history) {
          window.history.pushState({}, '', url);
        }
        // update Google Analytics
        ga('set', 'page', url.replace(/^(?:\/\/|[^\/]+)*/, ''));
        ga('send', 'pageview');
        // write page content
        load(xhr.responseText);
      } else {
        window.location.href = url;
      }
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  return xhr;
}

function load(data) {
  document.getElementsByTagName('main')[0].innerHTML = data.match(/<main>(.*)<\/main>/is)[1];
  window.scrollTo(0, 0);
  // reinitialise scripts
  init();
}

function closest(elem, tag) {
  if (elem.tagName.toLowerCase() == tag.toLowerCase()) {
    return elem;
  }
  var parent = elem.parentNode;
  if (parent == null) {
    return -1;
  } else {
    return closest(parent, tag);
  }
}

window.onpopstate = function(event) {
  event.preventDefault();
  preload(String(document.location), false);
};

/* FULL PAGE SCROLL HIJACK */
function downSection() {
  if (fullscreen) {
    if (scroll.activeSection >= scroll.sectionCount) {
      scroll.prevSection = scroll.activeSection;
      scroll.activeSection = 0;
    } else {
      scroll.prevSection = scroll.activeSection;
      scroll.activeSection++;
    }
    var positionFromTop = sections[scroll.activeSection].offsetTop;
    sections[scroll.prevSection].getElementsByTagName('div')[0].style.display = 'none';
    sections[scroll.activeSection].getElementsByTagName('div')[0].style.display = null;
    window.scrollTo(0, positionFromTop);
    document.getElementById('section-current').innerHTML = scroll.activeSection + 1;
  }
}

function upSection() {
  if (fullscreen) {
    if (scroll.activeSection == 0) {
      scroll.prevSection = scroll.activeSection;
      scroll.activeSection = scroll.sectionCount;
    } else {
      scroll.prevSection = scroll.activeSection;
      scroll.activeSection--;
    }
    var positionFromTop = sections[scroll.activeSection].offsetTop;
    sections[scroll.prevSection].getElementsByTagName('div')[0].style.display = 'none';
    sections[scroll.activeSection].getElementsByTagName('div')[0].style.display = null;
    window.scrollTo(0, positionFromTop);
    document.getElementById('section-current').innerHTML = scroll.activeSection + 1;
  }
}

document.addEventListener('scroll', function(e) {
  if (fullscreen) {
    e.preventDefault();
  }
});

document.addEventListener('wheel', function(e) {
  if (fullscreen) {
    e.preventDefault();
    if (scroll.isThrottled) { return; }
    scroll.isThrottled = true;
    setTimeout(function() {
      scroll.isThrottled = false;
    }, scroll.throttleDuration);
    if (event.deltaY < 0) {
      upSection();
    } else {
      downSection();
    }
  }

});

document.addEventListener('keydown', function(e) {
  if (fullscreen) {
    if (scroll.isThrottled) { return; }
    scroll.isThrottled = true;
    setTimeout(function() {
      scroll.isThrottled = false;
    }, scroll.keypressDuration);
    if (e.keyCode == 39 || e.keyCode == 40) {
      downSection();
    } else if (e.keyCode == 37 || e.keyCode == 38) {
      upSection();
    }
  }
});

window.onresize = function() {
  if (fullscreen) {
    var positionFromTop = sections[scroll.activeSection].offsetTop;
    window.scrollTo(0, positionFromTop);
  }
}

function reset() {
  fullscreen = false;
  document.body.style.overflow = null;
  sections = null;
  scroll = null;
  document.getElementById('pagination').style.display = 'none';
}

/* FUNCTION RUNS EVERY TIME A NEW PAGE IS LOADED */
function init() {
  /* ANIMATED PAGE TRANSITIONS */
  if(!!(window.history && history.pushState)) {
    var links = document.getElementsByTagName('a');
    for (var a = 0; a < links.length; a++) {
      if (links[a].host == window.location.host && links[a].href !== '') {
        links[a].onclick = function(event) {
          event.preventDefault();
          var anchor = closest(event.target, 'a');
          if (anchor != -1) {
            preload(String(anchor.href), true);
          }
        };
      }
    }
  }
  /* FULLSCREEN */
  fullscreen = document.getElementById('fullscreen');
  if (fullscreen) {
    sections = fullscreen.getElementsByTagName('section');
    if (sections.length > 0) {
      document.body.style.overflow = 'hidden';
      document.getElementById('pagination').style.display = null;
      scroll = {
        activeSection: Math.round(window.pageYOffset / sections[0].offsetHeight),
        prevSection: null,
        sectionCount: sections.length - 1,
        isThrottled: false,
        throttleDuration: 1000,
        keypressDuration: 400
      }
      document.getElementById('section-current').innerHTML = scroll.activeSection + 1;
      document.getElementById('section-total').innerHTML = scroll.sectionCount + 1;
      for (var i = 0; i < sections.length; i++) {
        if (i !== scroll.activeSection) {
          sections[i].getElementsByTagName('div')[0].style.display = 'none';
        }
      }
    } else {
      reset();
    }
  } else {
    reset();
  }
}

/* NAV */
var hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
  if (document.getElementById('nav').style.height !== '100vh') {
    document.getElementById('nav').style.height = '100vh';
    document.getElementById('main-logo').style.color = 'white';
    document.getElementById('nav-links').style.display = null;
  } else {
    document.getElementById('nav').style.height = '0';
    document.getElementById('main-logo').style.color = null;
  }
});

document.getElementById('nav').addEventListener('transitionend', function(event) {
  if (document.getElementById('nav').style.height !== '100vh') {
    document.getElementById('nav-links').style.display = 'none';
  }
});