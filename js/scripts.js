/* FULLSCREEN */
var fullscreen = document.getElementById('fullscreen');
document.getElementById('container').style.overflow = 'auto';

if(fullscreen) {
  var sections = fullscreen.getElementsByTagName('section');

  if(sections.length > 0) {

    document.getElementById('container').style.overflow = 'hidden';

    var scroll = {
      activeSection: Math.round( window.pageYOffset / sections[0].offsetHeight ),
      prevSection: null,
      sectionCount: sections.length - 1,
      isThrottled: false,
      throttleDuration: 1000,
      keypressDuration: 400
    }

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
  if(document.getElementById('nav').style.width !== '100vw') {
    document.getElementById('nav').style.width = '100vw';
  } else {
    document.getElementById('nav').style.width = '0px';
  }
});

/* SKETCH */
var sketchList = document.querySelectorAll('.sketch-border, .sketch-fill, .sketch');

for(var i = 0; i < sketchList.length; i++) {

  var shape = false;
  var line = false;
  var lineColor = null;
  var lineWidth = 2;
  var fill = false;
  var fillColor = null;
  var classes = sketchList[i].className.split(' ');

  for(var j = 0; j < classes.length; j++) {
    switch(classes[j]) {
      case 'square':
        shape = 'square';
        break;
      case 'circle':
        shape = 'circle';
        break;
      case 'sketch-border':
        line = true;
        break;
      case 'sketch-fill':
        fill = true;
        break;
    }
  }

  if(window.getComputedStyle(sketchList[i]).getPropertyValue('border-style') === 'solid') {
    lineColor = window.getComputedStyle(sketchList[i]).getPropertyValue('border-color');
    lineWidth = parseInt(window.getComputedStyle(sketchList[i]).getPropertyValue('border-width'));
  }

  if(window.getComputedStyle(sketchList[i]).getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)') {
    fillColor = window.getComputedStyle(sketchList[i]).getPropertyValue('background-color');
  }

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', sketchList[i].offsetWidth+40);
  svg.setAttribute('height', sketchList[i].offsetHeight+40);
  svg.setAttribute('viewBox', '0 0 '+(sketchList[i].offsetWidth+40)+' '+(sketchList[i].offsetHeight+40));
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.style.position = 'absolute';
  svg.style.left = 100 * (-20/sketchList[i].offsetWidth) + '%';
  svg.style.top = 100 * (-20/sketchList[i].offsetHeight) + '%';
  svg.style.width = 100 * (1 + 40/sketchList[i].offsetWidth) + '%';
  svg.style.height = 100 * (1 + 40/sketchList[i].offsetHeight) + '%';
  svg.style.zIndex = -50;
  var svgNS = svg.namespaceURI;
  var rc = rough.svg(svg);

  var params = {
    roughness: 2,
    stroke: 'none',
    strokeWidth: 2
  };

  if(line && lineColor) {
    params.stroke = lineColor;
    params.strokeWidth = lineWidth;
    sketchList[i].style.border = 'none';
  }

  if(fillColor) {
    params.fill = fillColor;
    params.fillWeight = 2 * params.strokeWidth;
    params.fillStyle = 'solid';
    sketchList[i].style.backgroundColor = 'transparent';

    if(fill) {
      params.fillStyle = 'zigzag';
    }

  }

  if(shape) {
    switch(shape) {
      case 'square':
        var node = rc.rectangle(
          20,
          20,
          sketchList[i].offsetWidth,
          sketchList[i].offsetHeight,
          params
        ); // x, y, width, height
        break;
      case 'circle':
        var node = rc.ellipse(
          20 + sketchList[i].offsetWidth/2,
          20 + sketchList[i].offsetHeight/2,
          sketchList[i].offsetWidth,
          sketchList[i].offsetHeight,
          params
        ); // x, y, width, height
        break;
    }
    svg.appendChild(node);
  }
  sketchList[i].appendChild(svg);
}