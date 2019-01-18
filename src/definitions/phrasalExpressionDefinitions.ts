// TODO
// create better definitions and function names
// use a library for translation (see i18next)
// translate everything

import { PhrasalExpressionDefinition } from './phrasalExpressionDefinition';
import { setPhrase } from './functionPhrase';
import { setDefinition } from './functionDefinition';
import { Phrexp} from '../main/phrasalexpressions';
import { separators } from './separator';
export const stringType = 'string';
export const numberType = 'number';
export const charRange = 'charRange';

export const utilityGroup = 'Utility';
export const rulesGroup = 'Rules';
export const captureGroup = 'Capture';
export const miscellaneousGroup = 'Miscellaneous';
export const loopsGroup = 'Loops';
export const modifiersGroup = 'Modifiers';
export const specialCharactersGroup = 'Special Characters';

export const phrasalExpressionDefinitions: PhrasalExpressionDefinition[] = [];

// Utility //

// Rules //

phrasalExpressionDefinitions.push({
  function: Phrexp.findCharKey,
  argumentTypes: [stringType],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.findCharKey, 'en', 'has {0}')
setPhrase(Phrexp.findCharKey, 'fr', 'contient {0}')
setDefinition(Phrexp.findCharKey, 'en', '')
setDefinition(Phrexp.findCharKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.findAnyCharKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.findAnyCharKey, 'en', 'has any character')
setPhrase(Phrexp.findAnyCharKey, 'fr', '')
setDefinition(Phrexp.findAnyCharKey, 'en', '')
setDefinition(Phrexp.findAnyCharKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.findAnythingKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.findAnythingKey, 'en', 'has anything')
setPhrase(Phrexp.findAnythingKey, 'fr', '')
setDefinition(Phrexp.findAnythingKey, 'en', '')
setDefinition(Phrexp.findAnythingKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.findInCharsKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.findInCharsKey, 'en', 'has a character in {0}')
setPhrase(Phrexp.findInCharsKey, 'fr', '')
setDefinition(Phrexp.findInCharsKey, 'en', '')
setDefinition(Phrexp.findInCharsKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.findNotInCharsKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.findNotInCharsKey, 'en', 'has a character not in {0}')
setPhrase(Phrexp.findNotInCharsKey, 'fr', '')
setDefinition(Phrexp.findNotInCharsKey, 'en', '')
setDefinition(Phrexp.findNotInCharsKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.findStringKey,
  argumentTypes: ['string'],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.findStringKey, 'en', 'has {0}')
setPhrase(Phrexp.findStringKey, 'fr', 'contient {0}')
setDefinition(Phrexp.findStringKey, 'en', 'Append a string. Find exactly the given value')
setDefinition(Phrexp.findStringKey, 'fr', 'Ajouter une chaîne de caractères. Trouve exactement la valeur donnée.')

phrasalExpressionDefinitions.push({
  function: Phrexp.startOfLineKey,
  argumentTypes: [],
  available: true,
  group: rulesGroup,
});
setPhrase(Phrexp.startOfLineKey, 'en', 'start of line')
setPhrase(Phrexp.startOfLineKey, 'fr', 'début de ligne')
setDefinition(Phrexp.startOfLineKey, 'en', 'Control that the expression appears at the beginning of a line.')
setDefinition(Phrexp.startOfLineKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.endOfLineKey,
  argumentTypes: [],
  available: true,
  group: rulesGroup,
});
setPhrase(Phrexp.endOfLineKey, 'en', 'end of line')
setPhrase(Phrexp.endOfLineKey, 'fr', 'fin de ligne')
setDefinition(Phrexp.endOfLineKey, 'en', 'Control that the expression appears at the end of a line.')
setDefinition(Phrexp.endOfLineKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.maybeKey,
  argumentTypes: [stringType],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.maybeKey, 'en', 'has maybe {0}')
setPhrase(Phrexp.maybeKey, 'fr', 'contient peut-être {0}')
setDefinition(Phrexp.maybeKey, 'en', 'Add a string to the expression that might appear once (or not).') // 0 or 1 times
setDefinition(Phrexp.maybeKey, 'fr', 'Ajoute une chaîne de caractère à l\'expression qui peut apparaître une fois (ou pas).') // 0 or 1 times

phrasalExpressionDefinitions.push({
  function: Phrexp.anythingKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.anythingKey, 'en', 'has anything')
setPhrase(Phrexp.anythingKey, 'fr', 'n\'importe quoi')
setDefinition(Phrexp.anythingKey, 'en', 'Match any character(s) any (including zero) number of times.')
setDefinition(Phrexp.anythingKey, 'fr', 'Correspond à tout caractère (n\'importe quel nombre) (y compris zéro) nombre de fois.')


phrasalExpressionDefinitions.push({
  function: Phrexp.anythingButKey,
  argumentTypes: [stringType],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.anythingButKey, 'en', 'has anything but {0}')
setPhrase(Phrexp.anythingButKey, 'fr', 'a n\'importe quoi sauf {0}')
setDefinition(Phrexp.anythingButKey, 'en', 'Match any character(s) any (including zero) number ' +
'of times excepting letter in given value') // Matches everything excepting letter in given value')
setDefinition(Phrexp.anythingButKey, 'fr', 'Correspond à n\'importe quel caractère n\'importe quel nombre (y compris zéro) '+
'de fois excepté lettre en valeur donnée')

phrasalExpressionDefinitions.push({
  function: Phrexp.somethingKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.somethingKey, 'en', 'has something')
setPhrase(Phrexp.somethingKey, 'fr', 'a quelque chose')
setDefinition(Phrexp.somethingKey, 'en', 'Match any character(s) at least once.')
setDefinition(Phrexp.somethingKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.somethingButKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.somethingButKey, 'en', 'has something but {0}')
setPhrase(Phrexp.somethingButKey, 'fr', 'a quelque chose sauf {0}')
setDefinition(Phrexp.somethingButKey, 'en', 'Match any character(s) at least once except for specified characters.')
setDefinition(Phrexp.somethingButKey, 'fr', 'Correspond a n\'importe quel caractère au moins une fois, à l\'exception des caractères spécifiés.')

phrasalExpressionDefinitions.push({
  function: Phrexp.rangeKey,
  argumentTypes: [charRange],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.rangeKey, 'en', 'has a character within {0}')
setPhrase(Phrexp.rangeKey, 'fr', '')
setDefinition(Phrexp.rangeKey, 'en', 'Add expression to match one or multiple ranges (any character within the range(s))')
setDefinition(Phrexp.rangeKey, 'fr', '')

// Special Characters //


// Capture/ Group //
phrasalExpressionDefinitions.push({
  function: Phrexp.beginCaptureKey,
  argumentTypes: [],
  group: captureGroup,
  available: true,
});
setPhrase(Phrexp.beginCaptureKey, 'en', 'begin capture')
setPhrase(Phrexp.beginCaptureKey, 'fr', '')
setDefinition(Phrexp.beginCaptureKey, 'en', 'Starts a Capturing group(used to extract data from the regexp match.')
setDefinition(Phrexp.beginCaptureKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.endCaptureKey,
  argumentTypes: [],
  group: captureGroup,
  available: true,
});
setPhrase(Phrexp.endCaptureKey, 'en', 'end capture')
setPhrase(Phrexp.endCaptureKey, 'fr', '')
setDefinition(Phrexp.endCaptureKey, 'en', 'Ends a capturing group (Capture groups are used to extract data from the regexp match.)')
setDefinition(Phrexp.endCaptureKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.beginGroupKey,
  argumentTypes: [],
  group: captureGroup,
  available: true,
});
setPhrase(Phrexp.beginGroupKey, 'en', 'begin group')
setPhrase(Phrexp.beginGroupKey, 'fr', '')
setDefinition(Phrexp.beginGroupKey, 'en', 'Starts a group')
setDefinition(Phrexp.beginGroupKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.endCaptureKey,
  argumentTypes: [],
  group: captureGroup,
  available: true,
});
setPhrase(Phrexp.endGroupKey, 'en', 'end group')
setPhrase(Phrexp.endGroupKey, 'fr', '')
setDefinition(Phrexp.endGroupKey, 'en', 'Ends a Capturing group')
setDefinition(Phrexp.endGroupKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.beginDisjunctionKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
  separator: separators.get('or')
});
setPhrase(Phrexp.beginDisjunctionKey, 'en', 'begin disjunction')
setPhrase(Phrexp.beginDisjunctionKey, 'fr', '')
setDefinition(Phrexp.beginDisjunctionKey, 'en', 'Begins a disjunction')
setDefinition(Phrexp.beginDisjunctionKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.endDisjunctionKey,
  argumentTypes: [],
  group: rulesGroup,
  available: true,
});
setPhrase(Phrexp.endDisjunctionKey, 'en', 'end disjunction')
setPhrase(Phrexp.endDisjunctionKey, 'fr', '')
setDefinition(Phrexp.endDisjunctionKey, 'en', 'Ends a disjunction')
setDefinition(Phrexp.endDisjunctionKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.beginRepetitionKey,
  argumentTypes: [],
  group: loopsGroup,
  available: true,
});
setPhrase(Phrexp.beginRepetitionKey, 'en', 'beginRepetition')
setPhrase(Phrexp.beginRepetitionKey, 'fr', '')
setDefinition(Phrexp.beginRepetitionKey, 'en', 'Begins a Repetition')
setDefinition(Phrexp.beginRepetitionKey, 'fr', '')

phrasalExpressionDefinitions.push({
  function: Phrexp.endRepetitionKey,
  argumentTypes: [],
  group: loopsGroup,
  available: true,
});
setPhrase(Phrexp.endRepetitionKey, 'en', 'end repetition')
setPhrase(Phrexp.endRepetitionKey, 'fr', '')
setDefinition(Phrexp.endRepetitionKey, 'en', 'Ends a Repetition')
setDefinition(Phrexp.endRepetitionKey, 'fr', '')


// Special Characters //

phrasalExpressionDefinitions.push({
  function: Phrexp.findLineBreakKey,
  argumentTypes: [],
  group: specialCharactersGroup,
  available: true,
});
setPhrase(Phrexp.findLineBreakKey, 'en', 'has a line break')
setPhrase(Phrexp.findLineBreakKey, 'fr', 'a un saut de ligne')
setDefinition(Phrexp.findLineBreakKey, 'en', 'Add an expression to match a universal line break.')
setDefinition(Phrexp.findLineBreakKey, 'fr', 'Ajouter une expression pour correspondre à saut de ligne universelle.')

phrasalExpressionDefinitions.push({
  function: Phrexp.findTabKey,
  argumentTypes: [],
  group: specialCharactersGroup,
  available: true,
});
setPhrase(Phrexp.findTabKey, 'en', 'has a tab')
setPhrase(Phrexp.findTabKey, 'fr', 'contient une tabulation')
setDefinition(Phrexp.findTabKey, 'en', 'Add expression to match a tab character')
setDefinition(Phrexp.findTabKey, 'fr', 'Ajouter une expression pour correspondre à une tabulation')

phrasalExpressionDefinitions.push({
  function: Phrexp.findDigitKey,
  argumentTypes: [],
  group: specialCharactersGroup,
  available: true,
});
setPhrase(Phrexp.findDigitKey, 'en', 'has a digit')
setPhrase(Phrexp.findDigitKey, 'fr', 'contient un chiffre')
setDefinition(Phrexp.findDigitKey, 'en', 'Add expression to match a digit')
setDefinition(Phrexp.findDigitKey, 'fr', 'Ajouter une expression pour correspondre à un chiffre')

phrasalExpressionDefinitions.push({
  function: Phrexp.findWhitespaceKey,
  argumentTypes: [],
  group: specialCharactersGroup,
  available: true,
});
setPhrase(Phrexp.findWhitespaceKey, 'en', 'has a whitespace')
setPhrase(Phrexp.findWhitespaceKey, 'fr', 'contient un caractère d\'espacement')
setDefinition(Phrexp.findWhitespaceKey, 'en', 'Add expression to match any whitespace character.')
setDefinition(Phrexp.findWhitespaceKey, 'fr', 'Ajouter une expression pour correspondre à n\'importe quel caractère d\'espacement.')
