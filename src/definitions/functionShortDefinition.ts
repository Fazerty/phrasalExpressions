import { Language } from './phrasalDefinitions';

export const functionShortDefinitions: Map<string, FunctionShortDefinition> = new Map<string, FunctionShortDefinition>();

export class FunctionShortDefinition{
  public en: string = '';
  public fr: string = '';

  public setDefinition(lang: Language, definition: string): void {
    switch (lang) {
      case 'en': {
        this.en = definition;
        break;
      }
      case 'fr': {
        this.fr = definition;
        break;
      }
    }
  }

  public getDefinition(lang: Language): string {
    switch (lang) {
      case 'en': return this.en;
      case 'fr': return this.fr;
      default: return '';
    }
  }

  constructor(functionKey: string) {
    functionShortDefinitions.set(functionKey,this);
  }
}

export function setShortDefinition(key: string, lang: Language, definition: string) {
  let functionDefinition: FunctionShortDefinition | undefined = functionShortDefinitions.get(key);
  if (!functionDefinition) {
    functionDefinition = new FunctionShortDefinition(key);
  }
  functionDefinition.setDefinition(lang, definition);
}