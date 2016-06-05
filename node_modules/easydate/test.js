'use strict'

var easydate = require('./easydate')
var assert = require('assert')

assert.equal(easydate('d/M/Y', {setDate: '2015-11-03T00:00:00.000Z'}), '03/11/2015')
assert.equal(easydate('d-M-Y @ h:m', {setDate: '2015-11-03T16:06:00.000Z'}), '03-11-2015 @ 16:06')
assert.equal(easydate('h:m:s', {setDate: '2015-11-03T16:06:08.000Z'}), '16:06:08')
assert.equal(easydate('h:m:s.l', {setDate: '2015-11-03T16:06:08.123Z'}), '16:06:08.123')

assert.equal(easydate('h', {setDate: '2015-11-03T16:06:08.000Z', timeZone: 'local'}), '16')

assert.equal(easydate('d-M-y', {setDate: '03/01/2017'}), '01-03-17')
assert.equal(easydate('M~d~Y', {setDate: '03/01/2017'}), '03~01~2017')
assert.equal(easydate('M/d/Y', {setDate: '03/01/2017'}), '03/01/2017')
assert.equal(easydate('M/d/Y', {setDate: '01/01/2017'}), '01/01/2017')
assert.equal(easydate('M/d/Y', {setDate: '12/31/3045'}), '12/31/3045')

assert.equal(easydate('d-M-y', {setDate: '03-01-2017'}), '01-03-17')
assert.equal(easydate('M~d~Y', {setDate: '03-01-2017'}), '03~01~2017')
assert.equal(easydate('M/d/Y', {setDate: '03-01-2017'}), '03/01/2017')
assert.equal(easydate('M/d/Y', {setDate: '01-01-2017'}), '01/01/2017')
assert.equal(easydate('M/d/Y', {setDate: '12-31-3045'}), '12/31/3045')

assert.notEqual(easydate('z', {setDate: '2015-11-03T16:06:00.000Z'}), null)
assert.notEqual(easydate('z', {setDate: '2015-11-03T16:06:00.000Z', timeZone: 'utc'}), null)

// invalid string (aside from an empty string) will throw
try {
  easydate('M/d/Y', {setDate: 'not valid'})
} catch (exception) {
  assert(exception)
}

// with a single argument a date string will be returned
assert.equal(typeof easydate('M/d/Y'), 'string')

console.log('Tests passed.')
