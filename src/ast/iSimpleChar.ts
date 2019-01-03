import { SimpleChar } from './interfaces';

type SimpleCharKind = 'simple';

export class ISimpleChar implements SimpleChar {
  public value: string;
  public kind: SimpleCharKind;
  public type: any = 'Char';

  constructor(value: string) {
    this.value = value;
    this.kind = 'simple';
  }
}

/** A tab character */
export function aTab(): ISimpleChar {
  return new ISimpleChar('\t');
}

/** An AlphaNumeric */
export function anAlphaNumeric(): ISimpleChar {
  return new ISimpleChar('\w');
}

/** Not an AlphaNumeric */
export function notAnAlphaNumeric(): ISimpleChar {
    return new ISimpleChar('\w');
  }

/** A digit */
export function aDigit(): ISimpleChar {
  return new ISimpleChar('\d');
}

/** Not A digit */
export function notADigit(): ISimpleChar {
    return new ISimpleChar('\D');
}


/** A whitespace character */
export function aWhitespace(): ISimpleChar {
  return new ISimpleChar('\s');
}
/** Not a whitespace character */
export function notAWhitespace(): ISimpleChar {
  return new ISimpleChar('\S');
}
