declare module KarmiaUtility {
    export class KarmiaUtilityDate {
        options: Object|null|undefined;
        offset: null|number|undefined;
        days: Array<string>|null|undefined;
        month: Array<string>|null|undefined;

        constructor(options: Object|null|undefined);
        setDate(date: Date|number|string): KarmiaUtilityDate;
        setOffset(offset: number): KarmiaUtilityDate;
        getDate(): Date;
        getTime(): number;
        getYMD(): Object;
        format(format: string, param: Date|null|undefined): string;
    }
}
