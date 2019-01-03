import {
    Expression,
    Alternative,
    CapturingGroup,
    NoncapturingGroup,
    AstClass,
    Disjunction,
    Group,
    Repetition,
    CharacterClass,
    AstRegExp,
    ClassRange,
    LookaroundAssertion
} from './ast/interfaces';
import { ICharacterClass } from './ast/iCharacterClass';
import { IClassRange } from './ast/iClassRange';
import { ISimpleChar } from './ast/iSimpleChar';
import { ISpecialChar } from './ast/iSpecialChar';
import { IConcatenation } from './ast/iConcatenation';
import { IDisjunction } from './ast/IDisjunction';
import { INoncapturingGroup } from './ast/iNonCapturingGroup';
import { ICapturingGroup } from './ast/iCapturingGroup';
import { IRepetition } from './ast/IRepetion';
import { INamedBackreference } from './ast/iNamedBackReference';
import { INumericBackreference } from './ast/iNumericBackReference';
import { ISimpleAssertion } from './ast/iSimpleAssertion';
import { ILookaroundAssertion } from './ast/iLookaroundAssertion';

// Classes allowed as parent
export type ParentExpression =
    | CharacterClass
    | Alternative
    | Disjunction
    | Group
    | Repetition
    | LookaroundAssertion
    | AstRegExp;

// Classes allowed as child
export type ChildExpression =
    | ICharacterClass
    | ISimpleChar
    | ISpecialChar
    | IClassRange
    | IConcatenation
    | IDisjunction
    | INoncapturingGroup
    | ICapturingGroup
    | INamedBackreference
    | INumericBackreference
    | IRepetition
    | ISimpleAssertion
    | ILookaroundAssertion;

// Used when a Expression parameter is mandatory.
export function getEmptyExpression(): Expression {
    return new ICharacterClass();
}


/**
 * Checks if an expression is an 'empty' Expression.
 *
 * @export
 * @param {Expression} exp
 * @returns {boolean}
 */
export function isEmptyExpression(exp: Expression): boolean {
    if (exp.type === 'CharacterClass' && !(exp as CharacterClass).expressions) {
        return true;
    } else {
        return false;
    }
}

/**
 *
 *
 * @param {(Expression | ClassRange)} child
 * @returns {Expression}
 */
function prepareChild(child: Expression | ClassRange): Expression {
    if (child.type === 'ClassRange') {
        const characterClass: CharacterClass = new ICharacterClass();
        characterClass.expressions.push(child);
        return characterClass;
    } else {
        return child;
    }
}

/**
 * Function to sanatize a string to be able to use it safely in an expression
 *
 * @export
 * @param {string} value
 * @returns {string}
 */
export function sanitize(value: string): string {
    // Regular expression to match meta characters
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
    const toEscape: RegExp = /([\].|*?+(){}^$\\:=[])/g;

    // Escape meta characters
    return value.replace(toEscape, '\\' + '$&');
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
}

/**
 *
 *
 * @param {Expression} exp
 * @returns {Expression}
 */
function prepareParent(exp: Expression): Expression {
    // IConcatenation could be an argument
    // ?? do we need to check allowed expression?
    const allowedParentType: string[] = [
        'CharacterClass',
        'Alternative',
        //'Disjunction',
        //'Group',
        'Repetition',
        'LookaroundAssertion',
        'RegExp'
    ];
    if (allowedParentType.indexOf(exp.type) === -1) {
        const newParent: Alternative = new IConcatenation();
        newParent.expressions.push(exp);
        return newParent;
    } else {
        return exp;
    }
}

/**
 *
 *
 * @export
 * @param {ParentExpression} parent
 * @param {(Expression | ClassRange)} child
 * @returns {Expression}
 */
export function addExpression(
    parent: ParentExpression,
    child: Expression | ClassRange
): Expression {
    const parentType: AstClass = parent.type;
    switch (parentType) {
        case 'RegExp': {
            const astRegExp: AstRegExp = parent as AstRegExp;
            if (astRegExp.body === null) {
                astRegExp.body = prepareChild(child);
            } else {
                astRegExp.body = prepareParent(astRegExp.body);
                addExpression(astRegExp.body as ParentExpression, child);
            }
            break;
        }
        case 'CharacterClass': {
            const characterClass: CharacterClass = parent as CharacterClass;
            if (child.type === 'Char' || child.type === 'ClassRange') {
                characterClass.expressions.push(child);
            } else {
                throw new Error(
                    child.type + ' type not allowed as child of CharacterClass'
                );
            }
            break;
        }
        case 'Disjunction': {
            const disjunction: IDisjunction = parent as IDisjunction;
            disjunction.addExpression(prepareChild(child));
            break;
        }
        case 'Repetition': {
            const repetition: Repetition = parent as Repetition;
            if (isEmptyExpression(repetition.expression)) {
                repetition.expression = prepareChild(child);
            } else {
                repetition.expression = prepareParent(repetition.expression);
                addExpression(repetition.expression as ParentExpression, child);
            }
            break;
        }
        case 'Assertion': {
            if (
                (parent as LookaroundAssertion).kind === 'Lookahead' ||
                (parent as LookaroundAssertion).kind === 'Lookbehind'
            ) {
                const lookaroundAssertion: LookaroundAssertion = parent as LookaroundAssertion;
                if (lookaroundAssertion.assertion === null) {
                    lookaroundAssertion.assertion = prepareChild(child);
                } else {
                    lookaroundAssertion.assertion = prepareParent(
                        lookaroundAssertion.assertion
                    );
                    addExpression(
                        lookaroundAssertion.assertion as ParentExpression,
                        child
                    );
                }
            }
            break;
        }
        case 'Alternative': {
            const alternative: Alternative = parent as Alternative;
            alternative.expressions.push(prepareChild(child));
            break;
        }
        case 'Group': {
            if ((parent as CapturingGroup).capturing === true) {
                const group: CapturingGroup = parent as CapturingGroup;
                if (group.expression === null) {
                    group.expression = prepareChild(child);
                } else {
                    group.expression = prepareParent(group.expression);
                    addExpression(group.expression as ParentExpression, child);
                }
            } else {
                const group: NoncapturingGroup = parent as NoncapturingGroup;
                if (group.expression === null) {
                    group.expression = prepareChild(child);
                } else {
                    group.expression = prepareParent(group.expression);
                    addExpression(group.expression as ParentExpression, child);
                }
                break;
            }
        }
    }
    return parent as Expression;
}
