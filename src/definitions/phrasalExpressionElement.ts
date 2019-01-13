import { PhrasalExpressionDefinition } from './phrasalExpressionDefinition';

export class PhrasalExpressionElement {
  public definition: PhrasalExpressionDefinition;
  public args: any[]; // empty => no argument
  constructor(definition: PhrasalExpressionDefinition, args: any[]) {
      this.definition = definition;
      this.args = args;
  }
}