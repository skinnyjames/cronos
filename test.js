var cronos = require('./index')


let date = cronos({
  seconds: 31536000, 
  from: new Date(2000, 4, 8, 0, 0, 0)
})




let whenThePyramidsWereBuilt = cronos(-146011680000, new Date(2000, 0, 1, 0, 0, 0, 0)) 

let deathOfAlexanderTheGreat = cronos(-73255805000, new Date(2000, 0, 1, 0, 0, 0, 0))

console.log(deathOfAlexanderTheGreat.years)

let future = new Date(8000, 0, 1, 0, 0, 0, 0)

console.log('future', deathOfAlexanderTheGreat.from(future).years)








let date2 = cronos(-146011680000, new Date(2000, 0, 1, 0, 0, 0, 0))

console.log(date2.years)

console.log(date2 - date)

console.log(date.friendly())
console.log(date.fromNow().friendly())

console.log('serial', date.serialize())
