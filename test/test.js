const assert = require('assert')
const cronos = require('../index')

describe('cronos', () => {
  describe('#parse()', () => {
    it('should return a new object', () => {
      assert(typeof cronos.parse() == 'object')
    })
    it('should take x seconds from date timestamp', () => {
      let obj = cronos.parse('-2000000', Date.now());
    })
  })
})
