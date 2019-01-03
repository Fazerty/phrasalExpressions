import { Location } from './location';
import { AstRegExp, Expression } from './interfaces';

// global match; find all matches rather than stopping after the first match
type globalMatchFlag = 'g';
const globalMatchFlag: globalMatchFlag = 'g';

// ignore case; if u flag is also enabled, use Unicode case folding
type ignoreCaseFlag = 'i';
const ignoreCaseFlag: ignoreCaseFlag = 'i';

// multiline; treat beginning and end characters (^ and $) as working over multiple lines
// (i.e., match the beginning or end of each line(delimited by \n or \r)
// , not only the very beginning or end of the whole input string)
type multilineFlag = 'm';
const multilineFlag: multilineFlag = 'm';

// Unicode; treat pattern as a sequence of Unicode code points
type unicodeFlag = 'u';
const unicodeFlag: unicodeFlag = 'u';

// sticky; matches only from the index indicated by the lastIndex property of
// this regular expression in the target string(and does not attempt to match from any later indexes).
type stikyFlag = 'y';
const stikyFlag: stikyFlag = 'y';

type flag =
    | globalMatchFlag
    | ignoreCaseFlag
    | multilineFlag
    | unicodeFlag
    | stikyFlag;


/**
 *
 *
 * @export
 * @class IAstRegExp
 * @implements {AstRegExp}
 */
export class IAstRegExp implements AstRegExp {
    public body: Expression | null = null;
    public flags: string = 'gm'; // global search and multiline by default
    public type: any = 'RegExp';
    public loc?: Location;

    /** Adds a modifier to the expression. */
    public addModifier(modifier: flag): AstRegExp {
        if (this.flags.indexOf(modifier) === -1) {
            this.flags += modifier;
        }
        return this;
    }
    /** Removes a modifier to the expression. */
    public removeModifier(modifier: flag): AstRegExp {
        if (this.flags.indexOf(modifier) !== -1) {
            this.flags = this.flags.replace(modifier, '');
        }
        return this;
    }
    /** Makes the expression case insensitive */
    public withAnyCase(): AstRegExp {
        this.addModifier(ignoreCaseFlag);
        return this;
    }
    /** Removes the global Match modifier to stop after the first match */
    public stopAtFirst(): AstRegExp {
        this.removeModifier(globalMatchFlag);
        return this;
    }
    /** Removes the multiline modifier. */
    public searchOneLine(): AstRegExp {
        this.removeModifier(multilineFlag);
        return this;
    }
}
