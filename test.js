var cronos = require('./index')

let date = cronos(-43453245, new Date(2017,4,9))

console.log(date.friendly())
console.log(date.fromNow().friendly())

console.log('serial', date.serialize())
