import { LookaroundAssertion, Expression } from './interfaces';

type AssertionKind = 'Lookahead' | 'Lookbehind';

export class ILookaroundAssertion implements LookaroundAssertion {
    public kind: AssertionKind;
    public type: any = 'Assertion';
    public negative?: true;
    public assertion: Expression | null = null;

    constructor(kind: AssertionKind) {
        this.kind = kind;
    }
}
