import { SimpleQuantifier } from 'regexp-tree/ast';

export const zeroOrMore = '*';
type zeroOrMore = '*';

export const oneOrMore = '+';
type oneOrMore = '+';

export const zeroOrOne = '?';
type zeroOrOne = '?';

type quantifierKind = zeroOrOne | oneOrMore | zeroOrMore;

export class ISimpleQuantifier implements SimpleQuantifier {
    public kind: quantifierKind;
    public greedy: boolean;
    public type: any = 'Quantifier';

    constructor(kind: quantifierKind, greedy?: boolean) {
        this.kind = kind;
        if (typeof greedy === 'undefined') {
            this.greedy = true;
          } else {
            this.greedy = greedy;
          }
    }
}
