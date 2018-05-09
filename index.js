//const JAVASCRIPT_FLOOR = -100,000,000 days before january 1, 1970
// spans are represented like -2342342342342<>75555433333


const SECONDS_PER_MINUTE= 60
const SECONDS_PER_DAY = 86400
const SECONDS_PER_WEEK = 604800
const SECONDS_PER_YEAR = 31536000

const HUNDRED = 100 
const THOUSAND = 1000
const MILLION = 1000000

const HOURS_PER_DAY = 24
const DAYS_PER_WEEK = 7
const WEEKS_PER_YEAR = 365

module.exports = createCronos

function Cronos(time, reference) {

  this.seconds = time
  this.reference = reference

  return this
}

Cronos.prototype.fromNow = function Cronos$fromNow() {

  let current = new Date(Date.now())
  let offset = (current - this.reference) / 1000

  this.reference = current
  this.seconds = this.seconds + -Math.abs(offset)
  
  return this
}

Cronos.prototype.friendly = function Cronos$friendly() {
  let seconds = Math.abs(this.seconds)
  let formatted = formatDate(this.reference)
  
  if (seconds > SECONDS_PER_YEAR) {
    let years = (seconds / SECONDS_PER_YEAR)

    if (years > MILLION) {

      return Math.round((years / MILLION)).toString() + ' Million Years from ' + formatted

    } else if (years > THOUSAND) {

      return Math.round((years / THOUSAND)).toString() + ' Thousand Years from ' + formatted

    } else if (years > HUNDRED) {

      return Math.round((years / THOUSAND)).toString() + ' Hundred Years from ' + formatted

    }

  } else if (seconds > SECONDS_PER_WEEK) {

    let weeks = (seconds / SECONDS_PER_WEEK)   
    return Math.round(weeks).toString() + ' Weeks from ' + formatted

  } else if (seconds > SECONDS_PER_DAY) {

    let days = (seconds / SECONDS_PER_DAY)
    return Math.round(days).toString() + ' Days from ' + formatted

  } else if (seconds > SECONDS_PER_MINUTE) {

    let minutes = (seconds / SECONDS_PER_MINUTE)
    return Math.round(minutes).toString() + ' Minutes from ' + formatted

  } else {
    
    return Math.round(seconds).toString() + ' Seconds from ' + formatted
    
  }

  function formatDate(date) {
    let day = date.getDate().toString()
    let month = (date.getMonth() + 1).toString()
    let year = (date.getFullYear()).toString()
    return month + '/' + day + '/' + year
  }
  
}

Cronos.prototype.serialize = function Cronos$seralize() {
  return this.seconds.toString() + '|' + this.reference.valueOf()
}

function createCronos(time, reference) {
  return new Cronos(time, reference)
}
 
