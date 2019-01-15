import { Alternative, Expression } from 'regexp-tree/ast';

export class IConcatenation implements Alternative {
    // Alternative is not the good term. Concatenation, Chain are better.
    public expressions: Expression[] = new Array<Expression>();
    public type: any = 'Alternative';

    public addExpression(expr: Expression) {
        this.expressions.push(expr);
    }
}
