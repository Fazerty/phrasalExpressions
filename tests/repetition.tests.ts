import { Phrexp } from '../src/phrasalExpressions';
import { assert } from 'chai';

const phrase: string = "abcdefg123456\nabc\t123 '(-).";



describe('Phrexp to regexp using repetitions', function() {
  it('Regexp for excatly 3 repetitions of a digit should be /\\d{3}/gm', () => {
    const regexp: RegExp = new Phrexp()
      .beginRepetition(3, 3)
      .findChar('digit')
      .toRegExp();
    assert.equal(regexp.toString(), '/\\d{3}/gm');
    assert.deepEqual(phrase.match(regexp), ['123', '456', '123']);
  });

  it('Regexp for 1 to 2 repetitions of a digit should be /\\d{1,2}/gm', () => {
    const regexp: RegExp = new Phrexp()
      .beginRepetition(1, 2)
      .findChar('digit')
      .toRegExp();
    assert.equal(regexp.toString(), '/\\d{1,2}/gm');
    assert.deepEqual(phrase.match(regexp), ['12', '34', '56', '12', '3']);
  });

  it('Regexp for 1 to 2 non greedy repetitions of a digit should be /\\d{1,2}?/gm', () => {
    const regexp: RegExp = new Phrexp()
      .beginRepetition(1, 2, false)
      .findChar('digit')
      .toRegExp();
    assert.equal(regexp.toString(), '/\\d{1,2}?/gm');
    assert.deepEqual(phrase.match(regexp), [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '1',
      '2',
      '3',
    ]);
  });

  it('Regexp for exactly 3 repetitions of an alphanumeric followed by a tab should be /\\w{3}\t/gm', () => {
    const regexp: RegExp = new Phrexp()
      .beginRepetition(3, 3)
      .findChar('alphanumeric').endRepetition().findChar('tab')
      .toRegExp();
    assert.equal(regexp.toString(), '/\\w{3}\t/gm');
    assert.deepEqual(phrase.match(regexp), ["abc\t"]);
  });

});
