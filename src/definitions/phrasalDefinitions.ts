import { Phrexp } from '../main/phrasalexpressions';
import { PhrasalExpressionDefinition } from './phrasalExpressionDefinition';
import { PhrasalExpressionElement } from './phrasalExpressionElement';
import { functionPhrases, FunctionPhrase } from './functionPhrase';
import {
  FunctionDefinition,
  functionDefinitions,
} from './functionDefinition';
import {
  phrasalExpressionDefinitions,
  utilityGroup,
  rulesGroup,
  miscellaneousGroup,
  loopsGroup,
  modifiersGroup,
  specialCharactersGroup,
  captureGroup,
} from './phrasalExpressionDefinitions';

export type Language = 'en' | 'fr';


// Class to ease the use of phrasal epxressions in a multilingual ui.

export class PhrexDef {
  private lang: Language;

  public allDefinitions: PhrasalExpressionDefinition[];

  constructor(lang: Language) {
    this.lang = lang;
    this.allDefinitions = this.getPhrasalExpressionDefinitions();
    this.initGroups()
  }

  public setLanguage(newLang: Language) {
    if (this.lang !== newLang) {
      this.lang = newLang;
      this.allDefinitions = this.getPhrasalExpressionDefinitions();
    }
  }

  private getPhrasalExpressionDefinitions(): PhrasalExpressionDefinition[] {
    return phrasalExpressionDefinitions
      .map((phrasalExpressionDefinition: PhrasalExpressionDefinition) => {
        const name: FunctionPhrase | undefined = functionPhrases.get(
          phrasalExpressionDefinition.function
        );
        const def: FunctionDefinition | undefined = functionDefinitions.get(
          phrasalExpressionDefinition.function
        );
        phrasalExpressionDefinition.functionName = name
          ? name.getPhrase(this.lang)
          : phrasalExpressionDefinition.function;
        phrasalExpressionDefinition.definition = def
          ? def.getDefinition(this.lang)
          : '';
        return phrasalExpressionDefinition;
      })
      .filter((value: PhrasalExpressionDefinition) => {
        return value.available ? true : false;
      })
      .sort(
        (a: PhrasalExpressionDefinition, b: PhrasalExpressionDefinition) => {
          if (a.functionName && b.functionName) {
            if (a.functionName < b.functionName) {
              return -1;
            }
            if (a.functionName > b.functionName) {
              return 1;
            }
          }
          return 0;
        }
      );
  }
  public utilityDefinitions: PhrasalExpressionDefinition[] = new Array<PhrasalExpressionDefinition>();
  public rulesDefinitions: PhrasalExpressionDefinition[] = new Array<PhrasalExpressionDefinition>();
  public miscellaneousDefinitions: PhrasalExpressionDefinition[] = new Array<PhrasalExpressionDefinition>();
  public loopsDefinitions: PhrasalExpressionDefinition[] = new Array<PhrasalExpressionDefinition>();
  public modifiersDefinitions: PhrasalExpressionDefinition[] = new Array<PhrasalExpressionDefinition>();
  public specialCharactersDefinitions: PhrasalExpressionDefinition[] = new Array<PhrasalExpressionDefinition>();
  public captureDefinitions: PhrasalExpressionDefinition[] = new Array<PhrasalExpressionDefinition>();

private initGroups(){
  this.utilityDefinitions = this.allDefinitions.filter(
    (value: PhrasalExpressionDefinition) => {
      return value.group === utilityGroup ? true : false;
    }
  );

  this.rulesDefinitions = this.allDefinitions.filter(
    (value: PhrasalExpressionDefinition) => {
      return value.group === rulesGroup ? true : false;
    }
  );
  this.miscellaneousDefinitions = this.allDefinitions.filter(
    (value: PhrasalExpressionDefinition) => {
      return value.group === miscellaneousGroup ? true : false;
    }
  );
  this.loopsDefinitions = this.allDefinitions.filter(
    (value: PhrasalExpressionDefinition) => {
      return value.group === loopsGroup ? true : false;
    }
  );

  this.modifiersDefinitions = this.allDefinitions.filter(
    (value: PhrasalExpressionDefinition) => {
      return value.group === modifiersGroup ? true : false;
    }
  );
  this.specialCharactersDefinitions = this.allDefinitions.filter(
    (value: PhrasalExpressionDefinition) => {
      return value.group === specialCharactersGroup ? true : false;
    }
  );

  this.captureDefinitions = this.allDefinitions.filter(
    (value: PhrasalExpressionDefinition) => {
      return value.group === captureGroup ? true : false;
    }
  );
}
}

export function createPhrexpFromElements(elts: PhrasalExpressionElement[]): Phrexp{
  const phrexp: Phrexp = new Phrexp();
  elts.forEach((elt: PhrasalExpressionElement) => {
    addFunction(phrexp, elt);
  })
  return phrexp;
}

export function addFunction(phrexp: Phrexp, elt: PhrasalExpressionElement) {
  // Rem: As it's used during the regex creation,
  // should works even mandatory args are not set yet => use default args.
  // add a parameter to check the validity of args and returns descriptions of the problems when they are not valid.
  const fn: string = elt.definition.function;
  const args: any[] = elt.args;

  switch (fn) {
    case Phrexp.findCharKey: {
      return phrexp.findChar(args[0]);
    }
    case
    Phrexp.findAnyCharKey: {
      return phrexp.findAnyChar();
    }
    case
    Phrexp.findAnythingKey: {
      return phrexp.findAnything();
    }
    case
    Phrexp.findInCharsKey: {
      return phrexp.findInChars();
    }
    case
    Phrexp.findNotInCharsKey: {
      return phrexp.findNotInChars();
    }
    case
    Phrexp.findStringKey: {
      return phrexp.findString(args[0]);
    }
    case
    Phrexp.startOfLineKey: {
      return phrexp.startOfLine();
    }
    case
    Phrexp.endOfLineKey: {
      return phrexp.endOfLine();
    }
    case
    Phrexp.maybeKey: {
      return phrexp.maybe(args[0]);
    }
    case
    Phrexp.anythingKey: {
      return phrexp.anything();
    }
    case
    Phrexp.anythingButKey: {
      return phrexp.anythingBut(args[0]);
    }
    case
    Phrexp.somethingKey: {
      return phrexp.something();
    }
    case
    Phrexp.somethingButKey: {
      return phrexp.somethingBut(args[0]);
    }
    case
    Phrexp.rangeKey: {
      return phrexp.range();
    }
    case
    Phrexp.beginCaptureKey: {
      return phrexp.beginCapture();
    }
    case
    Phrexp.endCaptureKey: {
      return phrexp.endCapture();
    }
    case
    Phrexp.beginGroupKey: {
      return phrexp.beginGroup();
    }
    case
    Phrexp.endGroupKey: {
      return phrexp.endGroup();
    }
    case
    Phrexp.beginDisjunctionKey: {
      return phrexp.beginDisjunction();
    }
    case
    Phrexp.endDisjunctionKey: {
      return phrexp.endDisjunction();
    }
    case
    Phrexp.beginRepetitionKey: {
      return phrexp.beginRepetition(args[0],args[1],args[2]);
    }
    case
    Phrexp.endRepetitionKey: {
      return phrexp.endRepetition();
    }
    /* To avoid errors
    case 'range': {
      let range: string = args[0] || '  ';
      if (range.length % 2 === 1) {
        range += ' ';
      }
      let correctedCharRange: string = '';
      for (let i = 0; i < range.length; i = i + 2) {
        const firstCharCode: number = range.charCodeAt(i);
        const secondCharCode: number = range.charCodeAt(i + 1);
        correctedCharRange += range[i];
        correctedCharRange +=
          secondCharCode > firstCharCode ? range[i + 1] : range[i];
      }
      return phrexp.range(...correctedCharRange.split(''));
    }
    */
    case Phrexp.findLineBreakKey: {
      return phrexp.findLineBreak();
    }
    case Phrexp.findTabKey: {
      return phrexp.findTab();
    }
    case Phrexp.findDigitKey: {
      return phrexp.findDigit();
    }
    case Phrexp.findWhitespaceKey: {
      return phrexp.findWhitespace();
    }
  }
}
