/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Declaration
declare function require(id: string): any;


// Import modules
import KarmiaUtilityDate from "../";
const expect = require("expect.js");


// Variables
const date = new KarmiaUtilityDate();


// Test
describe('karmia-utility-date', function () {
    describe('setOffset', function () {
        it('Should set offset', function () {
            const offset = 3 * 60 * 60 * 1000;
            date.setOffset(offset);

            delete date['date'];

            expect(date.offset).to.be(offset);
        });
    });

    describe('setDate', function () {
        it('Should set date', function () {
            const now = new Date(2016, 0, 1, 0, 0, 0),
                offset = 0;
            date.setDate(now);
            date.setOffset(offset);

            expect(date.offset).to.be(offset);
            expect(date.getDate().getTime()).to.be(now.getTime());
        });
    });

    describe('getDate', function (){
        it('Should get date', function () {
            const now = new Date(2016, 0, 1, 0, 0, 0),
                offset = 0;
            date.setDate(now);
            date.setOffset(offset);

            expect(date.getDate().getTime()).to.be(now.getTime());
        });
    });

    describe('getTime', function () {
        it('Should get time', function () {
            const now = new Date(2016, 0, 1, 0, 0, 0),
                offset = 0;
            date.setDate(now);
            date.setOffset(offset);

            expect(date.getTime()).to.be(now.getTime());
        });
    });

    describe('getYMD', function () {
        it('Should get YMD at 02:59:59.999', function () {
            const now = new Date(2016, 0, 1, 2, 59, 59, 999),
                offset = 3 * 60 * 60 * 1000;
            date.setDate(now);
            date.setOffset(offset);

            expect(date.getYMD()).to.eql({year: 2015, month: 12, date: 31});
        });

        it('Should get YMD at 03:00:00.000', function () {
            const now = new Date(2016, 0, 1, 3, 0, 0, 0),
                offset = 3 * 60 * 60 * 1000;
            date.setDate(now);
            date.setOffset(offset);

            expect(date.getYMD()).to.eql({year: 2016, month: 1, date: 1});
        });
    });

    describe('format', function () {
        it('Should format date', function () {
            const now = new Date('2014-08-03 09:00:00'),
                format = 'dDjlNSwz',
                result = '03Sun3Sunday7rd0214';
            date.setOffset(0);

            delete date['date'];

            expect(date.format(format, now)).to.be(result);
        });

        it('Should format week', function () {
            const now = new Date('2014-08-03 09:00:00'),
                format = 'W',
                result = '31';
            date.setOffset(0);

            delete date['date'];

            expect(date.format(format, now)).to.be(result);
        });

        it('Should format month', function () {
            const now = new Date('2014-08-03 09:00:00'),
                format = 'FmMnt',
                result = 'August08Aug831';
            date.setOffset(0);

            delete date['date'];

            expect(date.format(format, now)).to.be(result);
        });

        it('Should format year', function () {
            const now = new Date('2014-08-03 09:00:00'),
                format = 'LoYy',
                result = '02014201414';
            date.setOffset(0);

            delete date['date'];

            expect(date.format(format, now)).to.be(result);
        });

        it('Should format time', function () {
            const now = new Date('2014-08-03 21:00:00'),
                format = 'aABgGhHisu',
                result = 'pmPM54192109210000000000';
            date.setOffset(0);

            delete date['date'];

            expect(date.format(format, now)).to.be(result);
        });

        it('Should format timezone', function () {
            const now = new Date('2014-08-03 09:00:00'),
                format = 'OPTZ',
                result = '+0900+09:00JST-540';
            date.setOffset(0);

            delete date['date'];

            expect(date.format(format, now)).to.be(result);
        });

        it('Should format full date/time', function () {
            const now = new Date('2014-08-03 09:00:00'),
                format = 'crU',
                result = '2014-08-03T00:00:00.000ZSun, 03 Aug 2014 09:00:00 +09001407024000000';
            date.setOffset(0);

            delete date['date'];

            expect(date.format(format, now)).to.be(result);
        });

        it('Should format leap year', function () {
            date.setOffset(0);

            delete date['date'];

            expect(date.format('L', new Date('2000-01-01 09:00:00'))).to.be('1');
            expect(date.format('L', new Date('2001-01-01 09:00:00'))).to.be('0');
            expect(date.format('L', new Date('2016-01-01 09:00:00'))).to.be('1');
            expect(date.format('L', new Date('2100-01-01 09:00:00'))).to.be('0');
        });
    });
});
