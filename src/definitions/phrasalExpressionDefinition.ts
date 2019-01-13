import { Language } from '../phrasalDefinitions';
import { Separator } from './separator';

/**
 *
 *
 * @export
 * @interface PhrasalExpressionDefinition
 */
export interface PhrasalExpressionDefinition {
  definition?: string;
  functionName?: string;
  argumentTypes: string[]; // empty => no argument
  group: string;
  available?: true;
  function: string;
  // To indicate one stays in the same group/disjunction/... (0 or undefined) or that a group/disjunction/...is created (1) or left (-1).
  levelChange?: 1 | 0 | -1;
  // Separator used between children expressions.
  separator?: Separator
}

export interface Translation{
  language: Language
  name: string,
  definition: string,
  default?: true
}