import { SimpleAssertion } from 'regexp-tree/ast';

type StartOfLine = '^';
export const StartOfLine = '^';

type EnOfLine = '$';
export const EndOfLine = '$';

type StartOfWord = '\\b';
export const StartOfWord = '\\b';

type NotStartOfWord = '\\B';
export const NotStartOfWord = '\\B';

type AssertionKind = StartOfLine | EnOfLine | StartOfWord | NotStartOfWord;

export class ISimpleAssertion implements SimpleAssertion {
    public kind: AssertionKind;
    public type: any = 'Assertion';

    constructor(kind: AssertionKind) {
        this.kind = kind;
    }
}
