import {
    Expression,
    CapturingGroup
} from './interfaces';

export class ICapturingGroup implements CapturingGroup {
    public expression: Expression | null;
    public capturing: true = true;
    public number: number;
    public name?: string;
    public type: any = 'Group';

    constructor(
        groupNumber: number,
        expression?: Expression
    ) {
        this.number = groupNumber;
        this.expression = expression ? expression : null;
    }
}
