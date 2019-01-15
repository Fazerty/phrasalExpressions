import { Language } from './phrasalDefinitions';
export const separators: Map<string, Separator> = new Map<
  string,
  Separator
>();

export class Separator {
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

  public setPhrase(lang: Language, name: string): void {
    switch (lang) {
      case 'en': {
        this.en = name;
        break;
      }
      case 'fr': {
        this.fr = name;
        break;
      }
    }
  }

  constructor(key: string, en: string, fr: string) {
    this.key = key;
    this.en = en;
    this.fr = fr;
    separators.set(key, this);
  }
}

new Separator('and', 'and', 'et');
new Separator('or', 'or', 'ou');


