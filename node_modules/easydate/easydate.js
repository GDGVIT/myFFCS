'use strict'

function checkDst (date) {
  function stdTimezoneOffset (date) {
    var jan = new Date(date.getFullYear(), 0, 1)
    var jul = new Date(date.getFullYear(), 6, 1)
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  }
  return (stdTimezoneOffset(date) - date.getTimezoneOffset()) > 0
}

function easydate (pattern, config) {
  var HOUR = 3600000
  var setDate = config ? config.setDate : null
  var time = config && config.timeZone ? config.timeZone : 'local'
  var adjust = config ? config.adjust : false
  var date
  if (typeof config === 'object' && config.hasOwnProperty('setDate') && !setDate) return null
  function tidyNumber (value) {
    if (value < 10) return '0' + String(value)
    return String(value)
  }
  function tidyMs (value) {
    if (value < 10) return '00' + String(value)
    if (value < 100) return '0' + String(value)
    return String(value)
  }
  if (setDate) {
    if (String(Date.parse(setDate)) === 'NaN') {
      throw {
        name: 'Error',
        message: 'The supplied date "' + setDate +
          '" string was not formatted correctly.'
      }
    }
    date = new Date(setDate)
  } else {
    date = new Date()
  }
  var dst
  var offset = new Date().getTimezoneOffset()
  if (time === 'local') {
    dst = checkDst(date)
    if (adjust) { if (dst) date = new Date(date.valueOf() - HOUR) }
    var offsetString = 'UTC'
    if (offset < 0) offsetString += '+' + (String(offset).slice(1) / 60)
    if (offset > 0) offsetString += '-' + (offset / 60)
    return pattern
    .replace('d', tidyNumber(date.getDate()))
    .replace('M', tidyNumber(date.getMonth() + 1))
    .replace('y', String(date.getFullYear()).substring(2, 4))
    .replace('Y', String(date.getFullYear()))
    .replace('h', tidyNumber(date.getHours()))
    .replace('m', tidyNumber(date.getMinutes()))
    .replace('s', tidyNumber(date.getSeconds()))
    .replace('l', tidyMs(date.getMilliseconds()))
    .replace('z', offsetString)
    .replace('x', dst ? 'DST' : '')
  }
  dst = checkDst(date)
  return pattern
  .replace('d', tidyNumber(date.getUTCDate()))
  .replace('M', tidyNumber(date.getUTCMonth() + 1))
  .replace('y', String(date.getUTCFullYear()).substring(2, 4))
  .replace('Y', String(date.getUTCFullYear()))
  .replace('h', tidyNumber(date.getUTCHours()))
  .replace('m', tidyNumber(date.getUTCMinutes()))
  .replace('s', tidyNumber(date.getUTCSeconds()))
  .replace('l', tidyMs(date.getUTCMilliseconds()))
  .replace('z', 'UTC')
  .replace('x', dst ? 'DST' : '')
}

if (typeof module === 'object') module.exports = easydate
if (typeof window === 'object') window.easydate = easydate
