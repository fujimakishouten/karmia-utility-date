/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const util = require('util'),
    karmia_utility_string = require('karmia-utility-string'),
    kstring = karmia_utility_string();

class KarmiaUtilityDate {
    /**
     * Constructor
     *
     * @constructs KarmiaUtilityDate
     */
    constructor(options) {
        const self = this;
        self.options = options || {};
        self.offset = self.options.offset || 0;
        self.days = self.options.days || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        self.months = self.options.months || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (self.options.date) {
            self.date = (self.options.date instanceof Date) ? self.options.date : new Date(self.options.date);
        }
    }

    /**
     * Set date
     *
     * @param   {Date} date
     * @returns {KarmiaUtilityDate}
     */
    setDate(date) {
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
    setOffset(offset) {
        const self = this;
        self.offset = Number(offset);

        return self;
    }

    /**
     * Get current date object
     *
     * @returns {Date}
     */
    getDate() {
        const self = this;

        return self.date || new Date();
    }

    /**
     * Get current milliseconds
     *
     * @returns {number}
     */
    getTime() {
        const self = this;

        return (self.getDate().getTime());
    }

    /**
     * Get current Year/Month/Date object
     *
     * @returns {{year: number, month: number, date: number}}
     */
    getYMD() {
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
     * Get formatted time kstring
     *
     * @param   {kstring} format
     * @param   {Date} date
     * @returns {kstring}
     */
    format(format, date) {
        const self = this;
        date = date || self.getDate();

        return format.split('').map(function (value) {
            if ('d' === value) {
                return kstring.zfill(date.getDate(), 2);
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
                return Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000));
            } else if ('W' === value) {
                const day = new Date(date.getFullYear(), 0, 1).getDay() || 7,
                    days = Number(self.format('z', date)) + (day - 1),
                    weeks = Math.floor(days / 7);

                return (day < 5) ? weeks + 1 : weeks;
            } else if ('F' === value) {
                return self.months[date.getMonth()];
            } else if ('m' === value) {
                return kstring.zfill(date.getMonth() + 1, 2);
            } else if ('M' === value) {
                return self.months[date.getMonth()].slice(0, 3);
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
                return kstring.zfill((date.getHours() > 12) ? date.getHours() - 12 : date.getHours(), 2);
            } else if ('H' === value) {
                return kstring.zfill(date.getHours(), 2);
            } else if ('i' === value) {
                return kstring.zfill(date.getMinutes(), 2);
            } else if ('s' === value) {
                return kstring.zfill(date.getSeconds(), 2);
            } else if ('u' === value) {
                return kstring.zfill(date.getMilliseconds() * 1000, 6);
            } else if ('O' === value) {
                return date.toString().split(' ')[5].slice(3);
            } else if ('P' === value) {
                const offset = date.toString().split(' ')[5].slice(3);
                return util.format('%s%s:%s', offset.slice(0, 1), offset.slice(1, 3), offset.slice(-2));
            } else if ('T' === value) {
                return date.toString().split(' ')[6].slice(1, -1);
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
module.exports = function (options) {
    return new KarmiaUtilityDate(options || {});
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
