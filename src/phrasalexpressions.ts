import { generate, toRegExp } from 'regexp-tree';
import {
  AstRegExp,
  Expression,
  SimpleChar,
  Assertion,
  CapturingGroup,
  Alternative,
  Repetition,
  Quantifier,
  Group,
  Disjunction,
  CharacterClass,
  ClassRange,
  NoncapturingGroup,
} from 'regexp-tree/ast';
import {
  addExpression,
  sanitize,
  ParentExpression,
  getEmptyExpression,
} from './phrasalexpressions/ast/astUtil';
import {
  ISimpleAssertion,
  StartOfLine,
  EndOfLine,
} from './phrasalexpressions/ast/iSimpleAssertion';
import { ISimpleChar } from './phrasalexpressions/ast/iSimpleChar';
import {
  aWhitespace,
  notAWhitespace,
  aDigit,
  anAlphaNumeric,
  notAnAlphaNumeric,
  aTab,
} from './phrasalexpressions/ast/iSpecialChar';
//import { IAstRegExp } from './phrasalexpressions/ast/iAstRegExp';
import { ICapturingGroup } from './phrasalexpressions/ast/iCapturingGroup';
import { INoncapturingGroup } from './phrasalexpressions/ast/iNonCapturingGroup';
import { IConcatenation } from './phrasalexpressions/ast/iConcatenation';
import { IRepetition } from './phrasalexpressions/ast/IRepetion';
import {
  ISimpleQuantifier,
  zeroOrMore,
  oneOrMore,
  zeroOrOne,
} from './phrasalexpressions/ast/iSimpleQuantifier';
import { IRangeQuantifier } from './phrasalexpressions/ast/iRangeQuantifier';
import { IDisjunction } from './phrasalexpressions/ast/IDisjunction';
import { ICharacterClass } from './phrasalexpressions/ast/iCharacterClass';
import { IClassRange } from './phrasalexpressions/ast/iClassRange';
import { anyChar } from './phrasalexpressions/ast/iSpecialChar';
import { IAstRegExp } from './phrasalexpressions/ast/iAstRegExp';

/**
 *
 *
 * @export
 * @class Phrexp
 */
export class Phrexp {
  private capturingGroupNumber: number = 0;

  /**
   *
   *
   * @private
   * @type {AstRegExp}
   * @memberof Phrexp
   */
  public astRegExp: AstRegExp = new IAstRegExp();

  /**
   *
   *
   * @private
   * @type {Expression[]}
   * @memberof Phrexp
   */
  private currentPath: ParentExpression[] = new Array<ParentExpression>();

  /**
   * Find a simple char
   * or a range of simple chars (2 characters)
   * or specials (more than 2 characters) ('char' ,'any', 'digit', 'notDigit' , 'alphanumeric', 'notAlphanumeric', 'whitespace', 'notWhitespace', 'tab')
   * @param {string} value
   * @memberof Phrexp
   */
  public findChar(value: string): Phrexp {
    switch (value) {
      case 'char': {
        addExpression(this.currentExpression(), anyChar());
        return this;
      }
      case 'any': {
        // characters and linebreaks
        if (this.currentExpression().type !== 'CharacterClass') {
          const characterClass: CharacterClass = new ICharacterClass();
          addExpression(this.currentExpression(), characterClass);
          this.currentPath.push(characterClass);
          addExpression(this.currentExpression(), aWhitespace());
          addExpression(this.currentExpression(), notAWhitespace());
          this.leaveCurrentPath();
        } else {
          addExpression(this.currentExpression(), aWhitespace());
          addExpression(this.currentExpression(), notAWhitespace());
        }
        return this;
      }
      case 'digit': {
        addExpression(this.currentExpression(), aDigit());
        return this;
      }
      case 'notAdigit': {
        addExpression(this.currentExpression(), aDigit());
        return this;
      }
      case 'alphanumeric': {
        addExpression(this.currentExpression(), anAlphaNumeric());
        return this;
      }
      case 'notAlphanumeric': {
        addExpression(this.currentExpression(), notAnAlphaNumeric());
        return this;
      }
      case 'whitespace': {
        addExpression(this.currentExpression(), aWhitespace());
        return this;
      }
      case 'notWhitespace': {
        addExpression(this.currentExpression(), notAWhitespace());
        return this;
      }
      case 'tab': {
        addExpression(this.currentExpression(), aTab());
        return this;
      }
      default: {
        if (value.length === 1) {
          const newChar: SimpleChar = new ISimpleChar(sanitize(value));
          addExpression(this.currentExpression(), newChar);
          return this;
        }
        if (value.length === 2 && value.charCodeAt(0) < value.charCodeAt(1)) {
          const newChar: ClassRange = new IClassRange(
            new ISimpleChar(value[0]),
            new ISimpleChar(value[1])
          );
          addExpression(this.currentExpression(), newChar);
          return this;
        }
      }
    }
    throw new Error(value + ' is not allowed');
  }
  public static findCharKey = 'findChar';

  public findLineBreak(): Phrexp {
    return this.findChar('lineBreak');
  }
  public static findLineBreakKey = 'findLineBreak';

  public findTab(): Phrexp {
    return this.findChar('tab');
  }
  public static findTabKey = 'findTab';

  public findDigit(): Phrexp {
    return this.findChar('digit');
  }
  public static findDigitKey = 'findDigit';

  public findWhitespace(): Phrexp {
    return this.findChar('whitespace');
  }
  public static findWhitespaceKey = 'findWhitespace';
  /**
   * Find any character
   *
   * @param {string} value
   * @memberof Phrexp
   */
  public findAnyChar(): Phrexp {
    this.findChar('char');
    return this;
  }
  public static findAnyCharKey = 'findAnyChar';

  /**
   * Find any character linebreaks included
   *
   * @param {string} value
   * @memberof Phrexp
   */
  public findAnything(): Phrexp {
    this.findChar('any');
    return this;
  }
  public static findAnythingKey = 'findAnything';

  /**
   * Find a char that matchs one of the chars or ranges in the values.
   *
   * @param {string} values a list of character, ranges (two characters) or
   *
   * @memberof Phrexp
   */
  public findInChars(...values: string[]): Phrexp {
    let expression: ParentExpression = this.currentExpression();
    if (values.length > 1) {
      const disjunction: IDisjunction = new IDisjunction(); // better choice than characterclass
      addExpression(this.currentExpression(), disjunction);
      expression = disjunction;
      this.currentPath.push(disjunction);
    }
    values.forEach((value: string) => {
      if (value.length === 2) {
        const range: ClassRange = new IClassRange(
          new ISimpleChar(value[0]),
          new ISimpleChar(value[1])
        );
        addExpression(expression, range);
        return;
      }
      this.findChar(value);
    });
    if (values.length > 1) {
      this.leaveCurrentPath();
    }
    return this;
  }
  public static findInCharsKey = 'findInChars';

  /**
   * Find a char that doesn't match one of the chars or ranges in the values.
   *
   * @param {string} values a list of character, ranges (two characters) or
   *
   * @memberof Phrexp
   */
  public findNotInChars(...values: string[]): Phrexp {
    // TODO:  'any' => throw an error
    let expression: ParentExpression = this.currentExpression();
    if (values.length > 1) {
      const characterClass: ICharacterClass = new ICharacterClass(); // better choice than disjunction
      characterClass.negative = true;
      addExpression(this.currentExpression(), characterClass);
      expression = characterClass;
      this.currentPath.push(characterClass);
    }
    values.forEach((value: string) => {
      if (value.length === 2) {
        const range: ClassRange = new IClassRange(
          new ISimpleChar(value[0]),
          new ISimpleChar(value[1])
        );
        addExpression(expression, range);
        return;
      }
      this.findChar(value);
    });
    if (values.length > 1) {
      this.leaveCurrentPath();
    }
    return this;
  }
  public static findNotInCharsKey = 'findNotInChars';

  /**
   * Add a string to the expression
   *
   * @param {string} value
   * @memberof Phrexp
   */
  public findString(value: string): Phrexp {
    const concatenation: Alternative = new IConcatenation();
    sanitize(value)
      .split('')
      .forEach((char: string) => {
        const newChar: SimpleChar = new ISimpleChar(char);
        addExpression(concatenation, newChar);
      });
    addExpression(this.currentExpression(), concatenation);
    return this;
  }
  public static findStringKey = 'findString';

  // Assertions //

  /**
   * Specifiy that the next expression will follow the beginning of the line.
   *
   * @memberof Phrexp
   */
  public startOfLine(): Phrexp {
    const startOfLine: Assertion = new ISimpleAssertion(StartOfLine);
    addExpression(this.currentExpression(), startOfLine);
    return this;
  }
  public static startOfLineKey = 'startOfLine';

  /**
   * Mark the end at the last character of the line.
   *
   * @memberof Phrexp
   */
  public endOfLine(): Phrexp {
    const startOfLine: Assertion = new ISimpleAssertion(EndOfLine);
    addExpression(this.currentExpression(), startOfLine);
    return this;
  }
  public static endOfLineKey = 'endOfLine';

  /**
   * Add a sequence of characters to the expression that might appear once (or not).
   *
   * @param {Expression} value
   * @memberof Phrexp
   */
  public maybe(values: string[]): Phrexp {
    this.beginRepetition(0, 1);
    this.findInChars(...values);
    this.endRepetition();
    return this;
  }
  public static maybeKey = 'maybe';

  /**
   * Match any character(s) or linebreaks any (including zero) number of times.
   *
   * @param {Expression} exp
   * @memberof Phrexp
   */
  public anything(): Phrexp {
    this.beginRepetition(0);
    this.findAnything();
    this.endRepetition();
    return this;
  }
  public static anythingKey = 'anything';

  /**
   * Match any character(s) or linebreaks any (including zero) number of times expect characters in the value.
   *
   * @param {Expression} exp
   * @param {(Expression | string[])} value
   * @memberof Phrexp
   */
  public anythingBut(values: string[]): Phrexp {
    this.beginRepetition(0);
    this.findNotInChars(...values);
    this.endRepetition();
    return this;
  }
  public static anythingButKey = 'anythingBut';

  /**
   * Match any character(s) or linebreaks at least once.
   *
   * @returns {Expression}
   * @memberof Phrexp
   */
  public something(): Phrexp {
    this.beginRepetition(1);
    this.findAnything();
    this.endRepetition();
    return this;
  }
  public static somethingKey = 'something';

  /**
   * Match any character(s)  or linebreaks at least once except the ones in the value.
   *
   * @returns {Expression}
   * @memberof Phrexp
   */
  public somethingBut(values: string[]): Phrexp {
    this.beginRepetition(1);
    this.findNotInChars(...values);
    this.endRepetition();
    return this;
  }
  public static somethingButKey = 'somethingBut';

  /**
   * Add expression to match a range (or multiply ranges). Ranges must be 2 characters.
   * The first character code of a range is smaller or equal to the code of the second character.
   *
   * @param {...string[]} values
   * @memberof Phrexp
   */
  public range(...values: string[]): Phrexp {
    this.beginDisjunction();
    values.forEach((value: string) => {
      if (value.length === 2) {
        this.findChar(value);
      } else {
        throw new Error();
      }
    });
    return this;
  }

  public static rangeKey = 'range';

  // Loops //

  /**
   * Starts a capturing group.
   *
   * @memberof Phrexp
   */
  public beginCapture() {
    const capturingGroup: CapturingGroup = new ICapturingGroup(
      ++this.capturingGroupNumber
    );
    addExpression(this.currentExpression(), capturingGroup);
    this.currentPath.push(capturingGroup);
    return this;
  }
  public static beginCaptureKey = 'beginCapture';
  /**
   * Ends a capturing group.
   *
   * @memberof Phrexp
   */
  public endCapture() {
    if (
      (this.currentExpression() as any).type === 'Group' &&
      (this.currentExpression() as any).capturing === true
    ) {
      this.leaveCurrentPath();
    } else {
      throw new Error('the current expression is not a capturing group');
    }
    return this;
  }
  public static endCaptureKey = 'endCapture';

  /**
   * Starts a non capturing group.
   *
   * @memberof Phrexp
   */
  public beginGroup() {
    const noncapturingGroup: NoncapturingGroup = new INoncapturingGroup(
      getEmptyExpression()
    );
    addExpression(this.currentExpression(), noncapturingGroup);
    this.currentPath.push(noncapturingGroup);
    return this;
  }
  public static beginGroupKey = 'beginGroup';

  /**
   * Ends a non capturing group.
   *
   * @memberof Phrexp
   */
  public endGroup() {
    if (
      (this.currentExpression() as any).type === 'Group' &&
      (this.currentExpression() as any).capturing === false
    ) {
      this.leaveCurrentPath();
    } else {
      throw new Error('the current expression is not a non capturing group');
    }
    return this;
  }

  public static endGroupKey = 'endGroup';
  /**
   * Start a disjunction
   *
   * @memberof Phrexp
   */
  public beginDisjunction() {
    const disjunction: Disjunction = new IDisjunction();
    const noncapturingGroup: Group = new INoncapturingGroup(disjunction);
    addExpression(this.currentExpression(), noncapturingGroup);
    this.currentPath.push(disjunction);
    return this;
  }
  public static beginDisjunctionKey = 'beginDisjunction';

  /**
   * Ends a disjunction.
   *
   * @memberof Phrexp
   */
  public endDisjunction() {
    if ((this.currentExpression() as any).type === 'Disjunction') {
      this.leaveCurrentPath();
    } else {
      throw new Error('the current expression is not a disjunction');
    }
    return this;
  }

  public static endDisjunctionKey = 'endDisjunction';
  /**
   * Starts a repetition.
   *
   * @param {number} from
   * @param {number} to
   * @param {boolean} [greedy]
   * @memberof Phrexp
   */
  public beginRepetition(from: number, to?: number, greedy?: boolean) {
    const expression: Expression = getEmptyExpression();
    let quantifier: Quantifier | undefined;
    if (from === 0 && !to) {
      quantifier = new ISimpleQuantifier(zeroOrMore, greedy);
    }
    if (from === 1 && !to) {
      quantifier = new ISimpleQuantifier(oneOrMore, greedy);
    }
    if (from === 0 && to === 1) {
      quantifier = new ISimpleQuantifier(zeroOrOne, greedy);
    }
    if (!quantifier) {
      quantifier = new IRangeQuantifier(from, to, greedy);
    }
    const repetition: Repetition = new IRepetition(expression, quantifier);
    addExpression(this.currentExpression(), repetition);
    this.currentPath.push(repetition);
    return this;
  }
  public static beginRepetitionKey = 'beginRepetition';

  /**
   * Ends a repetition.
   *
   * @memberof Phrexp
   */
  public endRepetition() {
    if ((this.currentExpression() as any).type === 'Repetition') {
      this.leaveCurrentPath();
    } else {
      throw new Error('the current expression is not a repetition');
    }
    return this;
  }
  public static endRepetitionKey = 'endRepetition';

  /**
   * Converts the Ast Expression to a RegExp object
   *
   * @returns {RegExp}
   * @memberof Phrexp
   */
  public toRegExp(): RegExp {
    return toRegExp(generate(this.astRegExp));
  }

  /**
   *
   *
   * @private
   * @returns {(Expression)}
   * @memberof Phrexp
   */
  private currentExpression(): ParentExpression {
    if (this.currentPath.length === 0) {
      return this.astRegExp;
    } else {
      return this.currentPath[this.currentPath.length - 1];
    }
  }

  /**
   *
   *
   * @private
   * @memberof Phrexp
   */
  private leaveCurrentPath(): void {
    if (this.currentPath.length < 2) {
      this.currentPath = new Array<ParentExpression>();
    } else {
      this.currentPath.splice(-1, 1);
    }
  }
}
