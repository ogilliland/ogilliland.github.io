var sections, scroll;
var fullscreen = false;
var animating = false;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function preload(url, history) { // TO DO - cancel preload if user navigates back again before completion
  animating = true;
  document.getElementById('cover').style.top = null;
  document.getElementById('cover').style.height = '100vh';
  // document.getElementById('cover').classList.add('cover-animating');
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3) {
      if (xhr.status == 200 || xhr.status == 404) {
        document.title = xhr.responseText.match(/<title>(.*)<\/title>/is)[1];
        if (history) {
          window.history.pushState({}, '', url);
        }
        tryload(url, xhr.responseText, history); // TO DO - make this more efficient by firing on completion
      } else {
        window.location.href = url;
      }
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  return xhr;
}

function tryload(url, data, history) {
  if (!animating) {
    load(url, data, history);
  } else {
    setTimeout(function() { tryload(url, data, history) }, 100);
  }
}

function load(url, data) {
  document.getElementsByTagName('main')[0].innerHTML = data.match(/<main>(.*)<\/main>/is)[1];
  window.scrollTo(0, 0);
  // reset animation
  animating = true;
  document.getElementById('cover').style.top = 0;
  document.getElementById('cover').style.height = 0;
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

document.getElementById('cover').addEventListener('transitionend', function(event) {
  animating = false;
});

window.onpopstate = function(event) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  event.preventDefault();
  preload(document.location, false);
};

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
  document.body.style.overflow = null;
  sections = null;
  scroll = null;
  document.getElementById('pagination').style.display = 'none';
}

function init() {
  /* ANIMATED PAGE TRANSITIONS */
  var links = document.getElementsByTagName('a');
  for (var a = 0; a < links.length; a++) {
    if (links[a].host == window.location.host && links[a].href !== '') {
      links[a].onclick = function(event) {
        event.preventDefault();
        var anchor = closest(event.target, 'a');
        if (anchor != -1) {
          preload(anchor.href, true);
        }
      };
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
  } else {
    document.getElementById('nav').style.height = '0';
    document.getElementById('main-logo').style.color = null;
  }
});