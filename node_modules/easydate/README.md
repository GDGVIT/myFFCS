# easydate [![Build Status](https://travis-ci.org/roryrjb/easydate.svg?branch=master)](https://travis-ci.org/roryrjb/easydate) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> Returns the date according to a pattern.

### Installation

```
$ npm install easydate
```

__Test:__

```
$ npm test
```

### Usage/API

__easydate(patternString, [config])__

The single exported function has two arguments. The first and only required argument is the pattern string (see _Pattern Options_ below). If only including the pattern string it will return a formatted string for the current date-time.

__`config`__ (object)

__`.setDate`__ (string)

DEFAULT: `null`

if the optional config object is supplied and includes a date string as the `setDate` key value, that particular date will be returned formatted. This input date string must be parseable by JavaScript's `Date.parse` function; see below for acceptable examples.

__`.timeZone`__ (string: `utc` or `local` only) _BREAKING CHANGE!!!_

DEFAULT: `local`

You can also include a `timeZone` key value, for either `local`, or `utc` to decide how to handle the time zone offset against UTC.

__`.adjust`__ (boolean)

DEFAULT: `false`

Whether or not to adjust DST, see _times_ below.

__Times:__

```
-- local --

2016-01-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-02-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-03-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-04-01T00:00:00.000Z --> 01:00:00 UTC+1 DST
2016-05-01T00:00:00.000Z --> 01:00:00 UTC+1 DST
2016-06-01T00:00:00.000Z --> 01:00:00 UTC+1 DST
2016-07-01T00:00:00.000Z --> 01:00:00 UTC+1 DST
2016-08-01T00:00:00.000Z --> 01:00:00 UTC+1 DST
2016-09-01T00:00:00.000Z --> 01:00:00 UTC+1 DST
2016-10-01T00:00:00.000Z --> 01:00:00 UTC+1 DST
2016-11-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-12-01T00:00:00.000Z --> 00:00:00 UTC+1

-- local {adjust: true} --

2016-01-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-02-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-03-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-04-01T00:00:00.000Z --> 00:00:00 UTC+1 DST
2016-05-01T00:00:00.000Z --> 00:00:00 UTC+1 DST
2016-06-01T00:00:00.000Z --> 00:00:00 UTC+1 DST
2016-07-01T00:00:00.000Z --> 00:00:00 UTC+1 DST
2016-08-01T00:00:00.000Z --> 00:00:00 UTC+1 DST
2016-09-01T00:00:00.000Z --> 00:00:00 UTC+1 DST
2016-10-01T00:00:00.000Z --> 00:00:00 UTC+1 DST
2016-11-01T00:00:00.000Z --> 00:00:00 UTC+1
2016-12-01T00:00:00.000Z --> 00:00:00 UTC+1

-- utc --

2016-01-01T00:00:00.000Z --> 00:00:00 UTC
2016-02-01T00:00:00.000Z --> 00:00:00 UTC
2016-03-01T00:00:00.000Z --> 00:00:00 UTC
2016-04-01T00:00:00.000Z --> 00:00:00 UTC DST
2016-05-01T00:00:00.000Z --> 00:00:00 UTC DST
2016-06-01T00:00:00.000Z --> 00:00:00 UTC DST
2016-07-01T00:00:00.000Z --> 00:00:00 UTC DST
2016-08-01T00:00:00.000Z --> 00:00:00 UTC DST
2016-09-01T00:00:00.000Z --> 00:00:00 UTC DST
2016-10-01T00:00:00.000Z --> 00:00:00 UTC DST
2016-11-01T00:00:00.000Z --> 00:00:00 UTC
2016-12-01T00:00:00.000Z --> 00:00:00 UTC
```

__Examples:__

```javascript
var easydate = require('easydate')

// current date/time
easydate('d-M-y') // "28-01-14"
easydate('d/M/Y') // "28/01/2014"
easydate('Y.M.d') // "2014.01.28"
easydate('M') // "01"
easydate('d-M-Y @ h:m:s.l') // "29-01-2014 @ 07:22:37.418"

// specified date/time
easydate('d-M-Y @ h:m', '2015-11-03T16:06:00.000Z') // "03-11-2015 @ 16:06"
easydate('h:m:s.l', '2015-11-03T16:06:08.123Z') // "16:06:08.123"
easydate('M~d~Y', '03-01-2017') // "03~01~2017"

// time zone (e.g. in UTC+1)
easydate('d/M/y', {setDate: '2016-10-01T00:00:00.000Z', timeZone: 'utc'}) // => "30/09/16"
easydate('d/M/y', {setDate: '2016-10-01T00:00:00.000Z', timeZone: 'local'}) // => "01/10/16"

easydate('z', {timeZone: 'utc'}) // => "UTC"
easydate('z', {timeZone: 'local'}) // => "UTC+1"

easydate('h:m:s z x', {setDate: '2016-08-01T00:00:00.000Z'}) // => "01:00:00 UTC+1 DST"
easydate('h:m:s z x', {setDate: '2016-08-01T00:00:00.000Z', adjust: true}) // => "00:00:00 UTC+1 DST"
```

### Pattern Options

* `Y` Full year (number - e.g. `2012`)
* `y` Year (number - e.g. `12`)
* `M` Month (number - e.g. `11`)
* `d` Day (number - e.g. `28`)
* `h` Hour (number - e.g. `02`)
* `m` Minute (number - e.g. `01`)
* `s` Second (number - e.g. `33`)
* `l` Millisecond (number - e.g. `001`)
* `z` Timezone (string - e.g. `UTC`, `UTC+1`, `UTC-11`)
* `x` DST (string - either `'DST'` or `''`)

_N.B. Case sensitive_

### Caveats

Any instances of the above characters will be replaced with the relevant numbers. It is recommended to not use words within the pattern string.

### License

MIT
