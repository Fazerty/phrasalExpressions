import { aWhitespace, notAWhitespace, aTab, aDigit } from './iSimpleChar';
import { CharacterClass, Char, ClassRange } from './interfaces';

export class ICharacterClass implements CharacterClass {
  public type: any = 'CharacterClass';
  public negative?: true;
  public expressions: Array<Char | ClassRange> = new Array<Char | ClassRange>();

  /** A universal line break expression */
  public addLineBreak() {
    this.expressions.push(aWhitespace());
    this.expressions.push(notAWhitespace());
  }

  /** A tab character */
  public addTab() {
    this.expressions.push(aTab());
  }

  /** A digit */
  public addDigit() {
    this.expressions.push(aDigit());
  }
  /** A whitespace character */
  public addWhitespace() {
    this.expressions.push(aWhitespace());
  }
}
