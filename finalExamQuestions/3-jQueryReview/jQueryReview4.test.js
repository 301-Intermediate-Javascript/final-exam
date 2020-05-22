'use strict';

/* ------------------------------------------------------------------------------------------------
CHALLENGE 1 - Review

There's a typo in the markup. The Pear is misspelled Perr. Use jQuery to fix the mistake.

------------------------------------------------------------------------------------------------ */

const $ = createSnippetWithJQuery(`
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Perr</li>
</ul>
`)

const fixTheTypo = () => {
// Solution Code Here...
};

describe('Testing challenge', () => {
  test('It should return markup with typo fixed', () => {
    const $ = fixTheTypo();

    expect($('.pear').text()).toStrictEqual('Pear');
  });
});