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
  
    it('should take a years property', () => {
      let date = cronos({
        years: -200,
        from: new Date(Date.now)
      })
      
      assert(date.years, -200)
    })

    it('should keep track of the date', () => {
      let date = cronos({
        years: 1,  
        from: new Date(2000, 0, 1)
      })   

      assert(date.years, 1) 

      let newDate = date.from(new Date(2018, 0, 1)) 
      
      assert(newDate.years, -17)

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
