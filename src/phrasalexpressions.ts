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
} from './ast/interfaces';
import {
  addExpression,
  sanitize,
  ParentExpression,
  getEmptyExpression,
} from './astUtil';
import {
  ISimpleAssertion,
  StartOfLine,
  EndOfLine,
} from './ast/iSimpleAssertion';
import { ISimpleChar } from './ast/iSimpleChar';
import {
  aWhitespace,
  notAWhitespace,
  aDigit,
  anAlphaNumeric,
  notAnAlphaNumeric,
  aTab,
} from './ast/iSpecialChar';
import { IAstRegExp } from './ast/iAstRegExp';
import { ICapturingGroup } from './ast/iCapturingGroup';
import { INoncapturingGroup } from './ast/iNonCapturingGroup';
import { IConcatenation } from './ast/iConcatenation';
import { IRepetition } from './ast/IRepetion';
import {
  ISimpleQuantifier,
  zeroOrMore,
  oneOrMore,
  zeroOrOne,
} from './ast/iSimpleQuantifier';
import { IRangeQuantifier } from './ast/iRangeQuantifier';
import { IDisjunction } from './ast/IDisjunction';
import {
  CharacterClass,
  ClassRange,
  SpecialChar,
  NoncapturingGroup,
} from './ast/interfaces';
import { ICharacterClass } from './ast/iCharacterClass';
import { IClassRange } from './ast/iClassRange';
import { anyChar } from './ast/iSpecialChar';

declare module 'regexp-tree' {
  interface ParserOptions {
    captureLocations?: boolean;
  }

  export function parse(s: string | RegExp, options?: ParserOptions): AstRegExp;

  export function generate(ast: AstRegExp): string;

  export function toRegExp(regexp: string): RegExp;
}

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
  private astRegExp: AstRegExp = new IAstRegExp();

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
   * specials (more than 2 characters) ('char' ,'any', 'digit', 'notDigit' , 'alphanumeric', 'notAlphanumeric', 'whitespace', 'notWhitespace', 'tab')
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
        if (this.currentExpression().type !== 'CharacterClass' && this.currentExpression().type !== 'Repetition' ) {
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
      }
    }
    throw new Error(value + ' is not allowed');
  }

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

  /**
   * Find a char that matchs one of the chars or ranges in the values.
   *
   * @param {string} values a list of character, ranges (two characters) or
   *
   * @memberof Phrexp
   */
  public findInChars(...values: string[]): Phrexp {
    const characterClass: ICharacterClass = new ICharacterClass();
    addExpression(this.currentExpression(), characterClass);
    this.currentPath.push();
    values.forEach((value: string) => {
      if (value.length === 2) {
        const range: ClassRange = new IClassRange(
          new ISimpleChar(value[0]),
          new ISimpleChar(value[1])
        );
        addExpression(characterClass, range);
        return;
      }
      this.findChar(value);
    });
    this.leaveCurrentPath();
    return this;
  }

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

  /**
   * Add a string to the expression that might appear once (or not).
   *
   * @param {Expression} value
   * @memberof Phrexp
   */
  public maybe(value: string): Phrexp {
    this.beginRepetition(0, 1);
    this.findString(value);
    this.endRepetition();
    return this;
  }

  /**
   * Match any character(s) or linebreaks any (including zero) number of times.
   *
   * @param {Expression} exp
   * @memberof Phrexp
   */
  public anything(): Phrexp {
    this.beginRepetition(0);
    this.findInChars();
    this.endRepetition();
    return this;
  }

  /**
   * Match any character(s) or linebreaks any (including zero) number of times expect characters in the value.
   *
   * @param {Expression} exp
   * @param {(Expression | string[])} value
   * @memberof Phrexp
   */
  public anythingBut(value: string): Phrexp {
    return this;
  }

  /**
   * Match any character(s) or linebreaks at least once.
   *
   * @returns {Expression}
   * @memberof Phrexp
   */
  public something(): Phrexp {
    return this;
  }

  /**
   * Match any character(s)  or linebreaks at least once except the ones in the value.
   *
   * @returns {Expression}
   * @memberof Phrexp
   */
  public somethingBut(value: string[]): Phrexp {
    return this;
  }

  /**
   * Match any of the provided strings
   *
   * @param {(Expression | string[])} value
   * @memberof Phrexp
   */
  public anyOf(value: string[]): Phrexp {
    return this;
  }

  /**
   * Ensure that the parameter does not follow.
   *
   * @param {Expression} value
   * @memberof Phrexp
   */
  public not(value: Expression): Phrexp {
    return this;
  }

  /**
   * Add expression to match a range (or multiply ranges)
   *
   * @param {...string[]} values
   * @memberof Phrexp
   */
  public range(...values: string[]): Phrexp {
    return this;
  }

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

  /**
   * Starts a non capturing group.
   *
   * @memberof Phrexp
   */
  public beginNonCapture() {
    const noncapturingGroup: NoncapturingGroup = new INoncapturingGroup(
      getEmptyExpression()
    );
    addExpression(this.currentExpression(), noncapturingGroup);
    this.currentPath.push(noncapturingGroup);
    return this;
  }

  /**
   * Ends a non capturing group.
   *
   * @memberof Phrexp
   */
  public endNonCapture() {
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
