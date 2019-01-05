import { Phrexp } from '../src/phrasalexpressions';
import { assert } from 'chai';

const phrase: string = 'abcdefg123456\nabc\t123 \'(-).'

describe('Simple Phrexp to regexp', function() {
  it("Regexp for simple char 'e' should be /e/gm", () => {
    const regexp: RegExp = new Phrexp().findChar('e').toRegExp();
    assert.equal(regexp.toString(), '/e/gm');
    assert.deepEqual(phrase.match(regexp), ['e']);
  });

  it('Regexp for any char should be /./gm', () => {
    const regexp: RegExp = new Phrexp().findAnyChar().toRegExp();
    assert.equal(regexp.toString(), '/./gm');
    assert.deepEqual(phrase.match(regexp), ['a','b','c','d','e','f','g','1','2','3','4','5','6','a','b','c','\t','1','2','3'," ","'","(","-",")","."]);
  });

  it('Regexp for any char (linebreaks included) should be /[\\s\\S]/gm', () => {
    const regexp: RegExp = new Phrexp().findAnything().toRegExp();
    assert.equal(regexp.toString(), '/[\\s\\S]/gm');
    assert.deepEqual(phrase.match(regexp), ['a','b','c','d','e','f','g','1','2','3','4','5','6','\n','a','b','c','\t','1','2','3'," ","'","(","-",")","."]);
  });

  it("Regexp for any digit or tab or char 'a' should be /[d\ta]/gm", () => {
    const regexp: RegExp = new Phrexp().findInChars('digit', 'tab', 'a').toRegExp();
    assert.equal(regexp.toString(), '/[\\d\ta]/gm');
    assert.deepEqual(phrase.match(regexp), ['a','1','2','3','4','5','6','a','\t','1','2','3']);
  });

  it("Regexp for simple char '.' should be /\\./gm", () => {
    const regexp: RegExp = new Phrexp().findChar('.').toRegExp();
    assert.equal(regexp.toString(), '/\\./gm');
    assert.deepEqual(phrase.match(regexp), ['.']);
  });

  it("Regexp for string 'abc' should be /abc/gm", () => {
    const regexp: RegExp = new Phrexp().findString('abc').toRegExp();
    assert.equal(regexp.toString(), '/abc/gm');
    assert.deepEqual(phrase.match(regexp), ['abc', 'abc']);
  });


});
