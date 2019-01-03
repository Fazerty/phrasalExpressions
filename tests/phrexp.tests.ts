import { Phrexp } from '../src/phrasalexpressions';
import { assert } from 'chai';

describe('Phrexp to regexp', function () {

  it('Regexp for simple char \'e\' should be /e/gm', () => {
    assert.equal(
      new Phrexp()
        .findChar('e')
        .toRegExp()
        .toString()
    ,'/e/gm');
  });

  it('Regexp for any char should be /./gm', () => {
    assert.equal(
      new Phrexp()
        .findAnyChar()
        .toRegExp()
        .toString()
    ,'/./gm');
  });

  it('Regexp for any char (linebreaks included) should be /[\\s\\S]/gm', () => {
    assert.equal(
      new Phrexp()
        .findAnything()
        .toRegExp()
        .toString()
    ,'/[\s\S]/gm');
  });

  it('Regexp for any digit or tab or char \'a\' should be /[d\\ta]/gm', () => {
    assert.equal(
      new Phrexp()
        .findInChars('digit','tab','a')
        .toRegExp()
        .toString()
    ,'/[d\ta]/gm');
  });

  it('Regexp for simple char \'.\' should be /\\./gm', () => {
    assert.equal(
      new Phrexp()
        .findChar('.')
        .toRegExp()
        .toString()
    ,'/\\./gm');
  });


  it('Regexp for string \'abc\' should be /abc/gm', () => {
    assert.equal(
      new Phrexp()
        .findString('abc')
        .toRegExp()
        .toString()
    ,'/abc/gm');
  });



});
