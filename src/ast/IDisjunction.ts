import { Disjunction, Expression } from 'regexp-tree/ast';

export class IDisjunction implements Disjunction {
    public expressions: Expression[];
    public type: any = 'Disjunction';

    private right: Expression | null = null;
    private left: Expression | null = null;

    constructor(expressions?: Expression[]) {
        if (expressions) {
            this.expressions = expressions;
        } else {
            this.expressions = new Array<Expression>();
        }
        this.getRight();
        this.getLeft();
    }

    public addExpression(expr: Expression) {
        this.expressions.push(expr);
        this.getRight();
        this.getLeft();
    }

    private getLeft(): void {
        this.left = this.expressions[0] ? this.expressions[0] : null;
    }

    private getRight(): void {
        this.right =
            this.expressions.length > 2
                ? new IDisjunction(this.expressions.slice(1))
                : this.expressions[1];
    }
}
