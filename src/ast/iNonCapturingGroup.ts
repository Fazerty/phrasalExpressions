import {
    Expression,
    NoncapturingGroup
} from './interfaces';

export class INoncapturingGroup implements NoncapturingGroup {
    public expression: Expression;
    public capturing: false = false;
    public type: any = 'Group';

    constructor(
        expression: Expression
    ) {
        this.expression = expression;
    }

    public addExpression(expr: Expression) {
        this.expression = expr;
    }
}
