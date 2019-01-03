import { AST } from '../src/ast';
import { assert } from 'chai';

describe('Ast to regexp', function () {

  it('Regexp for simple char \'e\' should be /e/gm', () => {
    assert.equal(
      new AST()
        .findChar('e')
        .toRegExp()
        .toString()
    ,'/e/gm');
  });

  it('Regexp for any char should be /./gm', () => {
    assert.equal(
      new AST()
        .findAnyChar()
        .toRegExp()
        .toString()
    ,'/./gm');
  });

  it('Regexp for any char (linebreaks included) should be /[\\s\\S]/gm', () => {
    assert.equal(
      new AST()
        .findAnything()
        .toRegExp()
        .toString()
    ,'/[\s\S]/gm');
  });

  it('Regexp for any digit or tab or char \'a\' should be /[d\\ta]/gm', () => {
    assert.equal(
      new AST()
        .findInChars('digit','tab','a')
        .toRegExp()
        .toString()
    ,'/[d\ta]/gm');
  });

  it('Regexp for simple char \'.\' should be /\\./gm', () => {
    assert.equal(
      new AST()
        .findChar('.')
        .toRegExp()
        .toString()
    ,'/\\./gm');
  });


  it('Regexp for string \'abc\' should be /abc/gm', () => {
    assert.equal(
      new AST()
        .findString('abc')
        .toRegExp()
        .toString()
    ,'/abc/gm');
  });

  

});
