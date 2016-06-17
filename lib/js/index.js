// Reveal.addEventListener('stuff', function() {
//   console.log('stuff was fired')
// });

var dependencies = []

// classList polyfill
dependencies.push({
  src: 'lib/js/classList.js',
  condition: function() { return !document.body.classList; }
})

// hljs
dependencies.push({
  src: 'plugin/highlight/highlight.js',
  async: true,
  callback: function() {
    var characters = {
      ',': 'character comma',
      '.': 'character period',
      '(': 'character parentheses',
      ')': 'character parentheses',
      '{': 'character curly-bracket',
      '}': 'character curly-bracket',
      '[': 'character square-bracket',
      ']': 'character square-bracket',
      '&amp;': 'character ampersand',
      '&lt;': 'character operator',
      '&gt;': 'character operator',
      ':=': 'character operator assignment',
      '?=': 'character operator assignment',
      '\\b=': 'character operator assignment',
      ':': 'character colen',
      ';': 'character semicolen',
      '++': 'character operator addition',
      '\\b+': 'character operator addition',
      '\\b-': 'character operator minus',
      '\\b/': 'character operator division',
      'const': 'constant',
      'var': 'constant',
      'let': 'constant',
      '!important': 'keyword',
      'arguments': 'keyword',
      '\\+?[a-z0-9_]+(?=\\()': 'function-name',
    }

    var character_keys = Object.keys(characters)
    var character_last = character_keys.pop()
    var characters_regex = new RegExp(character_last + '|\\' + character_keys.join('|\\'), 'ig')

    var blocks = [].slice.call(document.querySelectorAll('pre code:not(.nohighlight)'))

    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i]
      block.innerHTML = block.innerHTML
        .replace(/&amp;[a-z0-9_\-:]+/ig, function(m) {
          return '<span class="hljs-class">' + m + '</span>'
        })
        .replace(characters_regex, function(m) {
          var classes = characters[m] || characters['\\b' + m] || characters[m + '\\b'] || characters['\\b' + m + '\\b'] || characters[character_last]
          classes = 'hljs-' + classes.split(' ').join(' hljs-')
          return '<span class="' + classes + '">' + m + '</span>'
        })

      hljs.highlightBlock(block)
    }
  }
})

// zoom.js
dependencies.push({ src: 'plugin/zoom-js/zoom.js', async: true })

dependencies.push({ src: 'plugin/notes/notes.js', async: true })

dependencies.push({
  src: 'plugin/markdown/marked.js',
  condition: function() { return !!document.querySelector('[data-markdown]'); }
})

dependencies.push({
  src: 'plugin/markdown/markdown.js',
  condition: function() { return !!document.querySelector( '[data-markdown]' ); }
})

// livereload
dependencies.push({
  src: '//localhost:35729/livereload.js?&host=localhost&snipver=1',
  async: true
})

// codepen
dependencies.push({
  src: '//assets.codepen.io/assets/embed/ei.js',
  async: true
})

dependencies.push({
  src: 'lib/js/specificity-graph-standalone.js',
  async: true,
  callback: function () {
    trigger($('.reveal'), 'pkg', 'specificity')
  }
})

dependencies.push({
  src: 'lib/js/notes/notes.js',
  async: true
})


// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  transition: 'slide', // none/fade/slide/convex/concave/zoom
  // Optional reveal.js plugins
  dependencies: dependencies
})

function trigger(elements, event, data) {
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent(event, true, true);
  evt.data = data
  for (var i = 0; i < elements.length; i++) {
    elements[i].dispatchEvent(evt)
  }
}

function $(selector, context) {
  if (typeof selector !== 'string') {
    return [ selector ]
  }
  if (!context) {
    context = document
  }
  return [].slice.call(context.querySelectorAll(selector));
}

document.addEventListener('DOMContentLoaded', function() {
  // ;[].slice.call(document.querySelectorAll('.u-hide, .is-extraneous'))
  ;[].slice.call(document.querySelectorAll('.u-hide'))
    .forEach(function(section) {
      section.parentNode.removeChild(section);
    });

  ip(function(address) {
    address = 'http://' + address + ':8080'
    var ip_element = document.querySelector('.js-ip')
    ip_element.style = ''
    ip_element.innerHTML = '<b>Current presentation:</b> <a href="' + address + '" target="_blank">' + address + '</a>'
  })
})


function ip(callback) {
  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection   //compatibility for firefox and chrome
  var pc = new RTCPeerConnection({ iceServers:[] })
  var noop = function() {}
  pc.createDataChannel('') // create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop) // create offer and set local description
  pc.onicecandidate = function(ice) {  //listen for candidate events
    if(!ice || !ice.candidate || !ice.candidate.candidate) return
    var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
    if (callback) {
      callback(myIP)
    } else {
      console.log('my IP: ', myIP)
    }
    pc.onicecandidate = noop
  }
}
