var cronos = require('./index')


let date = cronos({
  years: -200000,
  from: new Date(2000, 0, 1, 0, 0, 0)
})

console.log(date.from(new Date(2018, 0, 1, 0, 0, 0)).friendly())



