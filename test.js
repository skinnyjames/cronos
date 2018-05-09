var cronos = require('./index')

let date = cronos(-2342342342342340, new Date(2000,4,9))

console.log(date.friendly())
console.log(date.fromNow().friendly())

console.log('serial', date.serialize())
