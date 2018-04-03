declare class KarmiaUtilityDate {
    options: object;
    offset: number;
    days: Array<string>;
    months: Array<string>;

    constructor(options?: object);
    setDate(date: Date|null|number|string): KarmiaUtilityDate;
    setOffset(offset: number): KarmiaUtilityDate;
    getDate(): Date;
    getTime(): number;
    getYMD(): object;
    format(format: string, date?: Date): string;
}

export = KarmiaUtilityDate;
