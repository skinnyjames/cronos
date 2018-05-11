## cronos

library for working with big dates

## usage

```
npm install @skinnyjames/cronos

```

```javascript 

const cronos = require('cronos')

// Pass an object with a seconds and from property

let aYearAgo = cronos({
  seconds: -31536000,
  from: new Date(2000, 0, 1, 0, 0, 0)
})

// or pass in as two parameters

let whenThePyramidsWereBuilt = cronos(-146011680000, new Date(2000, 0, 1, 0, 0, 0, 0))

```

get the number of years elapsed

```javascript

console.log(whenThePyramidsWereBuilt.years)

> -4630

```

get the span in seconds in between two events

```javascript

let deathOfAlexanderTheGreat = cronos(-73255805000, new Date(2000, 0, 1, 0, 0, 0, 0))

let spanInYears = (whenThePyramidsWereBuilt - deathOfAlexanderTheGreat) / 31536000

console.log(Math.round(spanInYears))

> 2307

```

find out the years elapsed from an arbitary date

```javascript

let future = new Date(8000, 0, 1, 0, 0, 0, 0)

console.log(deathOfAlexanderTheGreat.from(future).years)

> -8326

```

print a friendly date (in progress)


```javascript

console.log(aYearAgo.friendly())

> 1 years, from 1/1/2000

```

## development

please feel free to submit pull requests, report a bug, or just share your knowledge and ideas!

