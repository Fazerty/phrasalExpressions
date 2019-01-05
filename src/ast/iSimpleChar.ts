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


