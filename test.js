var cronos = require('./index')

let date = cronos(-31536000, new Date(2000, 4, 8, 0, 0, 0))

console.log(date.friendly())
console.log(date.fromNow().friendly())

console.log('serial', date.serialize())
