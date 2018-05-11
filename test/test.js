const assert = require('assert')
const cronos = require('../index')

describe('cronos', () => {
  describe('#init()', () => {

    it('should return a new object', () => {
      assert(typeof cronos() == 'object')
    })

    it('should take x seconds from date timestamp', () => {
      let obj = cronos('-2000000', Date.now());
    })

    it('should take an object as parameter', () => {
      let date = cronos({
        seconds: 31536000, 
        from: new Date(2000, 4, 8, 0, 0, 0)
      })
      assert(date.years, -1)
    })

    it('from should set the date relative to a new date', () => {
      let date = cronos({
        seconds: 31536000, 
        from: new Date(2000, 4, 8, 0, 0, 0)
      })
      assert(date.years, 1)

      date.from(new Date(2018, 4, 8, 0, 0, 0))

      assert(date.years, -17)

    }) 

  })
})
