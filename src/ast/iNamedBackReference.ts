import { NamedBackreference } from './interfaces';

export class INamedBackreference implements NamedBackreference {
    // Alternative is not the good term. Concatenation, Chain are better.
    public type: any = 'Backreference';
    public kind: 'name' = 'name';
    public reference: string;
    public number: number;

    constructor(reference: string, refNumber: number) {
        this.reference = reference;
        this.number = refNumber;
    }
}
