import { SpecialChar} from 'regexp-tree/ast';

//
type scMetaKind = 'meta';
export const scMetaKind: scMetaKind = 'meta';

//
type scControlKind = 'control';
export const scControlKind: scControlKind = 'control';

//
type scHexKind = 'hex';
export const scHexKind: scHexKind = 'hex';

//
type scDecimalKind = 'decimal';
export const scDecimalKind: scDecimalKind = 'decimal';

//
type scOctKind = 'oct';
export const scOctKind: scOctKind = 'oct';

//
type scUnicodeKind = 'unicode';
export const scUnicodeKind: scUnicodeKind = 'unicode';

export type SpecialCharKind =
    | scMetaKind
    | scControlKind
    | scHexKind
    | scDecimalKind
    | scOctKind
    | scUnicodeKind;

export class ISpecialChar implements SpecialChar {
    public value: string;
    public kind: SpecialCharKind;
    public type: any = 'Char';

    constructor(value: string, kind: SpecialCharKind) {
        this.value = value;
        this.kind = kind;
    }
}
export const anyChararacter = '.';

export function anyChar(): ISpecialChar{
    return new ISpecialChar(anyChararacter, 'meta');
}


// meta character are: ., \f, \r, \n, \t, \v, \0, [\b] (backspace char), \s, \S, \w, \W, \d, \D.

/** A tab character */
export const tabChararacter = '\t';
export function aTab(): ISpecialChar {
    return new ISpecialChar(tabChararacter, 'meta');
  }

  /** An AlphaNumeric */
  export function anAlphaNumeric(): ISpecialChar {
    return new ISpecialChar('\\w', 'meta');
  }

  /** Not an AlphaNumeric */
  export function notAnAlphaNumeric(): ISpecialChar {
      return new ISpecialChar('\\w', 'meta');
    }

  /** A digit */
  export function aDigit(): ISpecialChar {
    return new ISpecialChar('\\d', 'meta');
  }

  /** Not A digit */
  export function notADigit(): ISpecialChar {
      return new ISpecialChar('\\D', 'meta');
  }


  /** A whitespace character */
  export function aWhitespace(): ISpecialChar {
    return new ISpecialChar('\\s', 'meta');
  }
  /** Not a whitespace character */
  export function notAWhitespace(): ISpecialChar {
    return new ISpecialChar('\\S', 'meta');
  }


