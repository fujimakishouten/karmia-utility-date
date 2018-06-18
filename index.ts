/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import KarmiaUtilityString from "karmia-utility-string";


declare interface Options {
    offset?: number;
    days?: Array<string>;
    month?: Array<string>;
    date?: Date|string|number;
}

declare interface YMD {
    year: number;
    month: number;
    date: number
}


class KarmiaUtilityDate {
    /**
     * Properties
     */
    public options: Options;
    public offset: number;
    public days: Array<string>;
    public month: Array<string>;
    public date?: Date;

    /**
     * Constructor
     *
     * @constructs KarmiaUtilityDate
     */
    constructor(options?: Options) {
        this.options = options || {} as Options;
        this.offset = this.options.offset || 0;
        this.days = this.options.days || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.month = this.options.month || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (this.options.date) {
            this.date = (this.options.date instanceof Date) ? this.options.date : new Date(this.options.date);
        }
    }

    /**
     * Set date
     *
     * @param   {Date} date
     * @returns {KarmiaUtilityDate}
     */
    setDate(date: Date|null|number|string): KarmiaUtilityDate {
        const self = this;
        self.date = (date instanceof Date) ? date : new Date(date);

        return self;
    }

    /**
     * Get current offset
     *
     * @param   {number} offset
     * @returns {KarmiaUtilityDate}
     */
    setOffset(offset: number): KarmiaUtilityDate {
        const self = this;
        self.offset = Number(offset);

        return self;
    }

    /**
     * Get current date object
     *
     * @returns {Date}
     */
    getDate(): Date {
        return this.date || new Date();
    }

    /**
     * Get current milliseconds
     *
     * @returns {number}
     */
    getTime():number {
        const self = this;

        return (self.getDate().getTime());
    }

    /**
     * Get current Year/Month/Date object
     *
     * @returns {{year: number, month: number, date: number}}
     */
    getYMD(): YMD {
        const self = this,
            date = self.getDate(),
            current = new Date(date.getTime() - self.offset);

        return {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            date: current.getDate()
        };
    }

    /**
     * Get formatted time string
     *
     * @param   {string} format
     * @param   {Date} date
     * @returns {string}
     */
    format(format: string, date?: Date): string {
        const self = this;
        date = date || self.getDate();

        return format.split('').map(function (value) {
            if ('d' === value) {
                return KarmiaUtilityString.zfill(date.getDate(), 2);
            } else if ('D' === value) {
                return self.days[date.getDay()].slice(0, 3);
            } else if ('j' === value) {
                return date.getDate();
            } else if ('l' === value) {
                return self.days[date.getDay()];
            } else if ('N' === value) {
                return (date.getDay() > 0) ? date.getDay() : 7;
            } else if ('S' === value) {
                return ['st', 'nd', 'rd'][date.getDate() - 1] || 'th';
            } else if ('w' === value) {
                return date.getDay();
            } else if ('z' === value) {
                const firstDay = new Date(date.getFullYear(), 0, 1);

                return Math.floor((date.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000));
            } else if ('W' === value) {
                const base = new Date(date.getFullYear(), 0, 4),
                    first = new Date(base.getFullYear(), 0, base.getDate() - (base.getDay() || 7) + 1),
                    current = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() || 7) + 1);
                if (first <= current) {
                    return Math.floor((current.getTime() - first.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
                }

                return self.format('Y', current);
            } else if ('F' === value) {
                return self.month[date.getMonth()];
            } else if ('m' === value) {
                return KarmiaUtilityString.zfill(date.getMonth() + 1, 2);
            } else if ('M' === value) {
                return self.month[date.getMonth()].slice(0, 3);
            } else if ('n' === value) {
                return date.getMonth() + 1;
            } else if ('t' === value) {
                return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            } else if ('L' === value) {
                return (29 === new Date(date.getFullYear(), 2, 0).getDate()) ? 1 : 0;
            } else if ('o' === value) {
                return date.toISOString().slice(0, 4);
            } else if ('Y' === value) {
                return date.getFullYear();
            } else if ('y' === value) {
                return date.getFullYear().toString().slice(-2);
            } else if ('a' === value) {
                return (date.getHours() > 12) ? 'pm' : 'am';
            } else if ('A' === value) {
                return (date.getHours() > 12) ? 'PM' : 'AM';
            } else if ('B' === value) {
                const offset = (date.getTimezoneOffset() + 60) * 60,
                    seconds = ((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds() + offset),
                    beat = (seconds / (24 * 60 * 60)) * 1000;

                return Math.floor((beat < 0) ? beat + 1000 : beat);
            } else if ('g' === value) {
                return (date.getHours() > 12) ? (date.getHours() - 12) : date.getHours();
            } else if ('G' === value) {
                return date.getHours();
            } else if ('h' === value) {
                return KarmiaUtilityString.zfill((date.getHours() > 12) ? date.getHours() - 12 : date.getHours(), 2);
            } else if ('H' === value) {
                return KarmiaUtilityString.zfill(date.getHours(), 2);
            } else if ('i' === value) {
                return KarmiaUtilityString.zfill(date.getMinutes(), 2);
            } else if ('s' === value) {
                return KarmiaUtilityString.zfill(date.getSeconds(), 2);
            } else if ('u' === value) {
                return KarmiaUtilityString.zfill(date.getMilliseconds() * 1000, 6);
            } else if ('O' === value) {
                return date.toString().split(' ')[5].slice(3);
            } else if ('P' === value) {
                const offset = date.toString().split(' ')[5].slice(3);
                return `${offset.slice(0, 1)}${offset.slice(1, 3)}:${offset.slice(-2)}`;
            } else if ('T' === value) {
                const string = date.toString();
                const index = string.indexOf('(');
                const timezone = string.substring(index + 1, string.length - 1);
                if (timezone.indexOf(" ") < 0) {
                    return timezone;
                }

                return timezone.split(" ").reduce((collection, value) => {
                    return collection + value.charAt(0).toUpperCase();
                }, "");
            } else if ('Z' === value) {
                return date.getTimezoneOffset();
            } else if ('c' === value) {
                return date.toISOString();
            } else if ('r' === value) {
                return self.format('D, d M Y H:i:s O', date);
            } else if ('U' === value) {
                return date.getTime();
            } else {
                return value;
            }
        }).join('');
    }
}


// Export module
export default KarmiaUtilityDate;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
