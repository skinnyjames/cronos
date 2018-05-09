# usage

```javascript 

const cronos = require('cronos')

let date = cronos(-31536000, new Date(2000, 0, 1,0,0,0))

console.log(date.friendly()) 

// -1 years From 1/1/2000

console.log(date.fromNow().years)

// -19

```
