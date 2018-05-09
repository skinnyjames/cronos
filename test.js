var cronos = require('./index')

let date = cronos('-20000', Date.now())
console.log(date)
console.log('serial', date.serialize())
