import { SimpleChar } from 'regexp-tree/ast';

type SimpleCharKind = 'simple';

export class ISimpleChar implements SimpleChar {
  public value: string;
  public kind: SimpleCharKind;
  public type: any = 'Char';
  public escaped?: true;

  constructor(value: string, escaped? : true) {
    this.value = value;
    this.kind = 'simple';
    this.escaped = escaped;
  }
}


