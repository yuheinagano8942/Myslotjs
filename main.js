(function() {
  'use strict';

  var panels = document.getElementsByClassName('panel');
  var spin = document.getElementById('spin');

  var cards = [
    'seven.png',
    'bell.png',
    'cherry.png'
  ];
  
  
  var timers = [];
  
  var stopCount = 0;

  function runSlot(n) {
    timers[n] = setTimeout(function() {
      panels[n].children[0].src = 'img/' + cards[Math.floor(Math.random() * cards.length)];
        runSlot(n);
    }, 50);
  }
  
  function initPanel() {
    var i;
    for (i = 0; i < panels.length; i++) {
      panels[i].children[1].addEventListener('click', function() {
        if (this.className.indexOf('inactive') !== -1) {
      return;
    }
        clearTimeout(timers[this.dataset.index]);
        stopCount++;
        this.className = 'stop inactive';
        if (stopCount === panels.length) {
          stopCount = 0;
          checkResults();
          spin.className = '';
        }
      });
    }
  }
  
  function checkResults() {
    var img0 = panels[0].children[0];
    var img1 = panels[1].children[0];
    var img2 = panels[2].children[0];
    
    if (img0.src !== img1.src && img0.src !== img2.src) {
      img0.className = 'unmatched';
    }
    
    if (img1.src !== img0.src && img1.src !== img2.src) {
      img1.className = 'unmatched';
    }
    
    if (img2.src !== img0.src && img2.src !== img2.src) {
      img2.className = 'unmatched';
    }
  }
  
  initPanel();

  spin.addEventListener('click', function() {
    var i;
    if (this.className.indexOf('inactive') !== -1) {
      return;
    }
    this.className = 'inactive';
    for (i = 0; i < panels.length; i++) {
      runSlot(i);
      panels[i].children[0].className = '';
      panels[i].children[1].className = 'stop';
    }
  });
})();