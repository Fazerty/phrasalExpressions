import { Phrexp } from '../src/main/phrasalexpressions';
import { assert } from 'chai';
import { PhrasalExpressionElement } from '../src/definitions/phrasalExpressionElement';
import { phrasalExpressionDefinitions } from '../src/definitions/phrasalExpressionDefinitions';
import { PhrasalExpressionDefinition } from '../src/definitions/phrasalExpressionDefinition';
import { createPhrexpFromElements } from '../src/definitions/phrasalDefinitions';

const phrase: string = 'abcdefg123456\nabc\t123 \'(-).'

describe('Phrasal Expression Definitions to regexp ', function() {

  it("Def for simple char 'e' should be /e/gm", () => {
    const elts: PhrasalExpressionElement[] = new Array<PhrasalExpressionElement>();
    const phrasalExpressionDefinition : PhrasalExpressionDefinition | undefined = phrasalExpressionDefinitions.find((obj: PhrasalExpressionDefinition) => {
      return obj.function === Phrexp.findCharKey;
    })
    if (!phrasalExpressionDefinition) { throw new Error() };
    elts.push(new PhrasalExpressionElement(phrasalExpressionDefinition, ['e']));
    const phrexp: Phrexp = createPhrexpFromElements(elts);
    const regexp: RegExp = phrexp.toRegExp();
    assert.equal(regexp.toString(), '/e/gm');
    assert.deepEqual(phrase.match(regexp), ['e']);
  });
});
