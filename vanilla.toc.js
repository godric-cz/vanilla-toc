
function vanillatoc(tocRoot) {

  var config = {

  }

  //////////////////////
  // helper functions //
  //////////////////////

  var generateNumber = function(heading, counters) {
    var levels = 6;
    if(counters.length == 0) {
      counters.push(null)
      for(var i = 0; i < levels; i++) counters.push(0)
    }
    counters[heading.level]++
    for(var i = heading.level + 1; i <= levels; i++) counters[i] = 0
    heading.number = counters.slice(1,heading.level + 1).join('.')
  }

  var autohide = function(headings, level, active) {
    headings.forEach(function(e) {
      if(e.level >= level) e.tocElement.classList.add('collapsed')
      if(active.indexOf(e.number.slice(0, -2)) === 0) e.tocElement.classList.remove('collapsed')
    })
  }

  /////////////////
  // actual code //
  /////////////////

  var headingsDom = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
  var headings = []

  // generate headings datastructure
  var currentTop = document.body.getBoundingClientRect().top
  var counters = []
  headingsDom.forEach(function(e) { // TODO non-standard foreach on dom!
    var i = headings.push({
      top: e.getBoundingClientRect().top - currentTop,
      bottom: e.getBoundingClientRect().bottom - currentTop,
      name: e.textContent,
      level: parseInt(e.tagName.replace(/H/i, '')),
      element: e
    })
    generateNumber(headings[i - 1], counters);
  })

  // generate actual toc
  headings.forEach(function(e) {
    var de = document.createElement('div')
    de.innerHTML = e.number + ' ' + e.name
    de.onclick = function() {
      window.scroll(0, e.top)
    }
    tocRoot.appendChild(de)
    e.tocElement = de
  })

  // highlighting while scrolling
  document.body.onscroll = function() {
    var y = window.scrollY
    var done = false
    var last = headings.length - 1
    var active = ''
    headings.forEach(function(e, i) {
      if(done || e.bottom < y) {
        e.tocElement.classList.remove('active')
      } else {
        e.tocElement.classList.add('active')
        active = e.number
        done = true
      }
    })
    if(!done) {
      headings[last].tocElement.classList.add('active')
      active = headings[last].number
    }
    autohide(headings, 2, active)
  }

}
