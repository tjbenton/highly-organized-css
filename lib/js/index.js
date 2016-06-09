var $ = function(selector, context) {
  if (!context) {
    context = document
  }
  return [].slice.call(context.querySelectorAll(selector));
}

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
  ':': 'character colen',
  ';': 'character semicolen',
  '=': 'character operator assignment',
  '+': 'character operator addition',
  '-': 'character operator minus',
  '/': 'character operator division',
  '[a-z0-9_]+(?=\\()': 'function-name',
  'const': 'constant',
  'var': 'constant',
  'let': 'constant',
  '!important': 'keyword',
  'arguments': 'keyword',
}
var character_keys = Object.keys(characters)
var character_last = character_keys.pop()
var characters_regex = new RegExp(character_last + '|\\' + character_keys.join('|\\'), 'ig')
document.addEventListener('hljs', function(e) {
  var block = e.target
  if (block) {
    // block.innerHTML = block.innerHTML
    //   .replace(characters_regex, function(m) {
    //     var classes = characters[m] || characters[character_last]
    //     classes = 'hljs-' + classes.split(' ').join(' hljs-')
    //     return '<span class="' + classes + '">' + m + '</span>'
    //   });
    // console.log(mother_fucker);
    // console.log('');
    // console.log('');
    hljs.highlightBlock(block)
  }
})