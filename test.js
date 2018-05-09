var cronos = require('./index')

let date = cronos(-300000, new Date(2017,11,1))


console.log(date.friendly())
console.log(date.fromNow().friendly())

console.log('serial', date.serialize())
