import { Expression, NumericBackreference } from 'regexp-tree/ast';

export class INumericBackreference implements NumericBackreference {
    // Alternative is not the good term. Concatenation, Chain are better.
    public type: any = 'Backreference';
    public kind: 'number' = 'number';
    public reference: number;
    public number: number;

    constructor(reference: number, refNumber: number) {
        this.reference = reference;
        this.number = refNumber;
    }
}
