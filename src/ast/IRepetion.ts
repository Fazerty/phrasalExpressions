import { Repetition, Quantifier, Expression } from './interfaces';

export class IRepetition implements Repetition {
    public expression: Expression;
    public quantifier: Quantifier;
    public type: any = 'Repetition';

    constructor( expression: Expression, quantifier: Quantifier) {
        this.expression = expression;
        this.quantifier = quantifier;
    }

}
