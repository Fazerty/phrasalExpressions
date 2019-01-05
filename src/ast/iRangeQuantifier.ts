import { RangeQuantifier } from './interfaces';

export class IRangeQuantifier implements RangeQuantifier {
  public kind: 'Range' = 'Range';
  public from: number;
  public to?: number;
  public greedy: boolean;
  public type: any = 'Quantifier';

  constructor(from: number, to?: number, greedy?: boolean) {
    this.from = from;
    this.to = to;
    if (typeof greedy === 'undefined') {
      this.greedy = true;
    } else {
      this.greedy = greedy;
    }
  }
}
