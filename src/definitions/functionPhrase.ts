import { Language } from './phrasalDefinitions';
export const functionPhrases: Map<string, FunctionPhrase> = new Map<
  string,
  FunctionPhrase
>();

export class FunctionPhrase {
  public key: string;
  public en: string = '';
  public fr: string = '';

  public getPhrase(lang: Language): string {
    switch (lang) {
      case 'en':
        return this.en ? this.en : this.key;
      case 'fr':
        return this.fr ? this.fr : this.key;;
      default:
        return this.key;
    }
  }

  public setPhrase(lang: Language, phrase: string): void {
    switch (lang) {
      case 'en': {
        this.en = phrase;
        break;
      }
      case 'fr': {
        this.fr = phrase;
        break;
      }
    }
  }

  constructor(functionKey: string) {
    this.key = functionKey;
    functionPhrases.set(functionKey, this);
  }
}

export function setPhrase(key: string, lang: Language, phrase: string) {
  let functionPhrase: FunctionPhrase | undefined = functionPhrases.get(key);
  if (!functionPhrase) {
    functionPhrase = new FunctionPhrase(key);
  }
  functionPhrase.setPhrase(lang, phrase);
}
