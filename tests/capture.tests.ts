import { Phrexp } from '../src/phrasalexpressions';
import { assert } from 'chai';

const phrase: string = "abcdefg123456\nabc\t123 '(-).";

describe('Phrexp to regexp using captures', function () {

  it('Regexp to capture  a repetition of anything preceded by \'ab\' and followed by a digit should be /ab([\\s\\S]*)\\d/gm', () => {
    const regexp: RegExp = new Phrexp()
      .findString('ab')
      .beginCapture()
      .beginRepetition(0)
      .findAnything()
      .endRepetition()
      .endCapture()
      .findChar('digit')
      .toRegExp();
    assert.equal(regexp.toString(), '/ab([\\s\\S]*)\\d/gm');
    assert.deepEqual(phrase.match(regexp), ['abcdefg123456\nabc\t123']);
  });

  it.skip('anychar shouldn\'t be allowed in character class //ab([.]*)\\d/gm', () => {
    const regexp: RegExp = new Phrexp()
      .findString('ab')
      .beginCapture()
      .beginRepetition(0)
      .findAnyChar() // Should be allowed
      .endRepetition()
      .endCapture()
      .findChar('digit')
      .toRegExp();
    assert.equal(regexp.toString(), '/ab([.]*)\\d/gm');
    assert.deepEqual(phrase.match(regexp), ['123', '456', '123']);
  });

});
