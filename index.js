//const JAVASCRIPT_FLOOR = -100,000,000 days before january 1, 1970
// spans are represented like -2342342342342<>75555433333


const SECONDS_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_WEEK = 7
const WEEKS_PER_YEAR = 365

module.exports = createCronos

function Cronos(time, reference) {

  this.time = time
  this.reference = reference

  return this
}

Cronos.prototype.fromNow = function Cronos$fromNow() {
  let refSpan = Date.now() - this.reference

}

Cronos.prototype.serialize = function Cronos$seralize() {
  return this.time.toString() + '|' + this.reference.valueOf()
}

function createCronos(time, reference) {
  return new Cronos(time, reference)
}
 
