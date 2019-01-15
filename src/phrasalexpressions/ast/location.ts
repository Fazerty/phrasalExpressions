

export class Location {
    public source: string;
    public start: number;
    public end: number;

    constructor(source: string, start: number, end: number) {
        this.source = source;
        this.start = start;
        this.end = end;
    }
}
