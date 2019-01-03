import { SpecialChar} from './interfaces';

//
type scMetaKind = 'meta';
export const scMetaKind: scMetaKind = 'meta';

//
type scControlKind = 'control';
export const scControlKind: scControlKind = 'control';

//
type scHexKind = 'hex';
export const scHexKind: scHexKind = 'hex';

//
type scDecimalKind = 'decimal';
export const scDecimalKind: scDecimalKind = 'decimal';

//
type scOctKind = 'oct';
export const scOctKind: scOctKind = 'oct';

//
type scUnicodeKind = 'unicode';
export const scUnicodeKind: scUnicodeKind = 'unicode';

export type SpecialCharKind =
    | scMetaKind
    | scControlKind
    | scHexKind
    | scDecimalKind
    | scOctKind
    | scUnicodeKind;

export class ISpecialChar implements SpecialChar {
    public value: string;
    public kind: SpecialCharKind;
    public type: any = 'Char';

    constructor(value: string, kind: SpecialCharKind) {
        this.value = value;
        this.kind = kind;
    }
}
export const anyChararacter = '.';

export function anyChar(): ISpecialChar{
    return new ISpecialChar(anyChararacter, 'meta');
}


