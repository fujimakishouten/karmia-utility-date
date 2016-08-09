# karmia-utility-date
Karmia utility date module

## Usage
```JavaScript
const karmia_utility_date = require('karmia-utility-date'),
    kdate = new karmia_utility_date();
```

### getDate()
```JavaScript
kdate.getDate();
```

### getTime()
```JavaScript
kdate.getTime();
```

### getYMD()
```JavaScript
kdate.getYMD();
```

### format(format, date)
```JavaScript
// Current time
kdate.format('Y-m-d H:i:s');

// Specific time
kdate.format('Y-m-d H:i:s', new Date('1999-08-03 00:00:00'));
```

| format | description                                                             | example                                  |
|:-------|:------------------------------------------------------------------------|:-----------------------------------------|
| d      | Day of the month, 2 digits with leading zeros                           | 01-31                                    |
| D      | A textual representation of a day, three letters                        | Mon through Sun                          |
| j      | Day of the month without leading zeros                                  | 1 to 31                                  |
| l      | A full textual representation of the day of the week                    | Sunday through Saturday                  |
| N      | ISO-8601 numeric representation of the day of the week                  | 1 (for Monday) through 7 (for Sunday)    |
| S      | English ordinal suffix for the day of the month, 2 characters           | st, nd, rd or th. Works well with j      |
| w      | Numeric representation of the day of the week                           | 0 (for Sunday) through 6 (for Saturday)  |
| z      | The day of the year (starting from 0)                                   | 0 through 365                            |
| W      | ISO-8601 week number of year, weeks starting on Monday                  | Example: 42 (the 42nd week in the year)  |
| F      | A full textual representation of a month, such as January or March      | January through December                 |
| m      | Numeric representation of a month, with leading zeros                   | 01 through 12                            |
| M      | A short textual representation of a month, three letters                | Jan through Dec                          |
| n      | Numeric representation of a month, without leading zeros                | 1 through 12                             |
| t      | Number of days in the given month                                       | 28 through 31                            |
| L      | Whether it's a leap year                                                | 1 if it is a leap year, 0 otherwise.     |
| o      | ISO-8601 year number.                                                   | Examples: 1999 or 2003                   |
| Y      | A full numeric representation of a year, 4 digits                       | Examples: 1999 or 2003                   |
| y      | A two digit representation of a year                                    | Examples: 99 or 03                       |
| a      | Lowercase Ante meridiem and Post meridiem                               | am or pm                                 |
| A      | Uppercase Ante meridiem and Post meridiem                               | AM or PM                                 |
| B      | Swatch Internet time                                                    | 000 through 999                          |
| g      | 12-hour format of an hour without leading zeros                         | 1 through 12                             |
| G      | 24-hour format of an hour without leading zeros                         | 0 through 23                             |
| h      | 12-hour format of an hour with leading zeros                            | 01 through 12                            |
| H      | 24-hour format of an hour with leading zeros                            | 00 through 23                            |
| i      | Minutes with leading zeros                                              | 00 to 59                                 |
| s      | Seconds, with leading zeros                                             | 00 through 59                            |
| u      | Microseconds                                                            | Example: 654000                          |
| O      | Difference to Greenwich time (GMT) in hours                             | Example: +0200                           |
| P      | Difference to Greenwich time (GMT) with colon between hours and minutes | Example: +02:00                          |
| T      | Timezone abbreviation                                                   | Examples: EST, MDT ...                   |
| Z      | Timezone offset in seconds                                              | -43200 through 50400                     |
| c      | ISO 8601 date                                                           | 2004-02-12T15:19:21+00:00                |
| r      | RFC 2822 formatted date                                                 | Example: Thu, 21 Dec 2000 16:01:07 +0200 |
| U      | Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)              |                                          |
