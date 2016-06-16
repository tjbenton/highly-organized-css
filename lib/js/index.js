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
        // .replace(/(<span.*>&amp;<\/span>)([a-z0-9_\-:]+)/ig, function(m, one, two) {
        //   return one + '<span class="hljs-class">' + two + '</span>'
        // })

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
  ;[].slice.call(document.querySelectorAll('.u-hide, .is-extraneous'))
    .forEach(function(section) {
      section.parentNode.removeChild(section);
    });
})