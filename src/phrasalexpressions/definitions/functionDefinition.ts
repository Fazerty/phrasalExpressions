import { Language } from './phrasalDefinitions';

export const functionDefinitions: Map<string, FunctionDefinition> = new Map<string, FunctionDefinition>();

export class FunctionDefinition{
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
    functionDefinitions.set(functionKey,this);
  }
}

export function setDefinition(key: string, lang: Language, definition: string) {
  let functionDefinition: FunctionDefinition | undefined = functionDefinitions.get(key);
  if (!functionDefinition) {
    functionDefinition = new FunctionDefinition(key);
  }
  functionDefinition.setDefinition(lang, definition);
}