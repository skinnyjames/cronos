var cronos = require('./index')


let date = cronos({
  years: -200000,
  from: new Date(2000, 0, 1, 0, 0, 0)
})

let date2 = cronos({ 
  years: 1,
  from: new Date(2000, 0, 1, 0, 0, 0)
})

console.log(cronos)
let span = (date2 - date) / cronos.SECONDS_PER_YEAR
console.log(span + ' years')

//console.log(date.from(new Date(2018, 0, 1, 0, 0, 0)).friendly())

console.log(date.strftime('%years years and %months months from %date'))


