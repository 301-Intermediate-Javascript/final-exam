'use strict';

const cheerio = require('cheerio');

/* ------------------------------------------------------------------------------------------------
CHALLENGE 1 - Review

There's a typo in the markup. The Pear is misspelled Perr. Use jQuery to fix the mistake.

------------------------------------------------------------------------------------------------ */

let $ = createSnippetWithJQuery(`
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Perr</li>
</ul>
`)

const fixTheTypo = () => {
// Solution Code Here...
return $('.pear').text('Pear');
};

xdescribe('Testing challenge', () => {
  test('It should return markup with typo fixed', () => {
    $ = fixTheTypo();

    expect($('.pear').text()).toStrictEqual('Pear');
  });
});

function createSnippetWithJQuery(html){
  return cheerio.load(html);
};