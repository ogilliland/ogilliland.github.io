/* FULLSCREEN */
var fullscreen = document.getElementById('fullscreen');

if(fullscreen) {
  var sections = fullscreen.getElementsByTagName('section');

  if(sections.length > 0) {

    document.body.style.overflow = 'hidden';
    document.getElementById('pagination').style.display = null;

    var scroll = {
      activeSection: Math.round( window.pageYOffset / sections[0].offsetHeight ),
      prevSection: null,
      sectionCount: sections.length - 1,
      isThrottled: false,
      throttleDuration: 1000,
      keypressDuration: 400
    }

    document.getElementById('section-current').innerHTML = scroll.activeSection+1;
    document.getElementById('section-total').innerHTML = scroll.sectionCount+1;

    for(var i = 0; i < sections.length; i++) {
      if(i !== scroll.activeSection) {
        sections[i].getElementsByTagName('div')[0].style.display = 'none';
      }
    }

    function resize() {
      var positionFromTop = sections[scroll.activeSection].offsetTop;
      window.scrollTo(0, positionFromTop);
    }

    function downSection() {

      if(scroll.activeSection >= scroll.sectionCount) {
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

      document.getElementById('section-current').innerHTML = scroll.activeSection+1;

    }

    function upSection(){

      if(scroll.activeSection == 0) {
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

      document.getElementById('section-current').innerHTML = scroll.activeSection+1;

    }

    window.onresize = function() {
      resize();
    }

    document.addEventListener('scroll', function(e) {
      e.preventDefault();
    });

    document.addEventListener('wheel', function(e) {
      e.preventDefault();
      
      if (scroll.isThrottled) { return; }
      scroll.isThrottled = true;
      
      setTimeout(function () {
        scroll.isThrottled = false;
      }, scroll.throttleDuration);

      if(event.deltaY < 0) {
        upSection();
      } else {
        downSection();   
      }
    });

    document.addEventListener('keydown', function(e) {

      if (scroll.isThrottled) { return; }
      scroll.isThrottled = true;
      
      setTimeout(function () {
        scroll.isThrottled = false;
      }, scroll.keypressDuration);

      if (e.keyCode == 39 || e.keyCode == 40){
        downSection();
      } else if(e.keyCode == 37 || e.keyCode == 38){
        upSection();
      }

    });

  }

}

/* NAV */
var hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
  if(document.getElementById('nav').style.height !== '100vh') {
    document.getElementById('nav').style.height = '100vh';
    document.getElementById('main-logo').style.color = 'white';
  } else {
    document.getElementById('nav').style.height = '0';
    document.getElementById('main-logo').style.color = null;
  }
});