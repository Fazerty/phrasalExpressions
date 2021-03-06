import { ClassRange, Char } from 'regexp-tree/ast';

export class IClassRange implements ClassRange {
    public from: Char;
    public to: Char;
    public type: any = 'ClassRange';

    constructor( from: Char, to: Char) {
        this.from = from;
        this.to = to;
    }
}
