const hourglass = require('./index')

console.log(hourglass)


let date = hourglass({
  years: -200000,
  from: new Date(2000, 0, 1, 0, 0, 0)
})

let date2 = hourglass({ 
  years: 1,
  months: 3,
  weeks: 5,
  from: new Date(2000, 0, 1, 0, 0, 0)
})

let span = (date2 - date) / hourglass.SECONDS_PER_YEAR
console.log(span + ' years')

//console.log(date.from(new Date(2018, 0, 1, 0, 0, 0)).friendly())

console.log(date2.strftime('%years years and %months months from %date'))

