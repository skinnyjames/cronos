// const JAVASCRIPT_FLOOR = -100,000,000 days before january 1, 1970

const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 3600
const SECONDS_PER_DAY = 86400
const SECONDS_PER_WEEK = 604800
const SECONDS_PER_MONTH = 2629746
const SECONDS_PER_YEAR = 31536000

const HUNDRED = 100
const THOUSAND = 1000
const MILLION = 1000000

const SETTINGS = [
  { ratio: SECONDS_PER_YEAR, property: 'years' },
  { ratio: SECONDS_PER_MONTH, property: 'months' },
  { ratio: SECONDS_PER_WEEK, property: 'weeks' },
  { ratio: SECONDS_PER_DAY, property: 'days' },
  { ratio: SECONDS_PER_HOUR, property: 'hours' },
  { ratio: SECONDS_PER_MINUTE, property: 'minutes' }
]

module.exports = createHourGlass

function HourGlass (time, reference) {
  if (typeof time === 'object') {
    let seconds = time.seconds ? time.seconds : 0

    for (let i = 0; i < SETTINGS.length; i++) {
      if (time[SETTINGS[i].property]) {
        seconds += time[SETTINGS[i].property] * SETTINGS[i].ratio
      }
    }

    this.time = seconds
    this.reference = time.from
  } else {
    this.time = time
    this.reference = reference
  }

  let settings = SETTINGS.slice(0)

  tickTock(this, settings, this.time)

  return this
}

HourGlass.prototype.from = function HourGlass$from (current) {
  let offset = (current - this.reference) / 1000

  this.reference = current

  let time = -this.time + offset

  this.time = -time

  let settings = SETTINGS.slice(0)

  tickTock(this, settings, this.time)

  return this
}

HourGlass.prototype.fromNow = function HourGlass$fromNow () {
  return this.from(new Date(Date.now()))
}

HourGlass.prototype.strftime = function HourGlass$strftime (formatString) {
  let years = Math.abs(this.years)
  let formattedDate = formatDate(this.reference)

  if (years > MILLION) {
    years = (this.years / MILLION).toString() + ' Million'
  } else if (years > THOUSAND) {
    years = (this.years / THOUSAND).toString() + ' Thousand'
  } else if (years > HUNDRED) {
    years = (this.years / HUNDRED).toString() + ' Hundred'
  } else {
    years = this.years.toString()
  }

  formatString = formatString.replace(/%years/, years)
  formatString = formatString.replace(/%months/, this.months)
  formatString = formatString.replace(/%weeks/, this.weeks)
  formatString = formatString.replace(/%days/, this.days)
  formatString = formatString.replace(/%hours/, this.hours)
  formatString = formatString.replace(/%minutes/, this.minutes)
  formatString = formatString.replace(/%seconds/, this.seconds)
  formatString = formatString.replace(/%date/, formattedDate)

  return formatString

  function formatDate (date) {
    let day = date.getDate().toString()
    let month = (date.getMonth() + 1).toString()
    let year = (date.getFullYear()).toString()
    return month + '/' + day + '/' + year
  }
}

HourGlass.prototype.valueOf = function HourGlass$valueOf () {
  return (this.reference / 1000) - this.time
}

HourGlass.prototype.export = function HourGlass$export () {
  return {
    seconds: this.time,
    from: this.reference
  }
}

function tickTock (self, settings, remainder) {
  if (settings.length === 0) { return }

  let setting = settings.shift()

  if (Math.abs(remainder) >= setting.ratio) {
    self[setting.property] = remainder < 0 ? Math.ceil(remainder / setting.ratio) : Math.floor(remainder / setting.ratio)
    remainder = remainder % setting.ratio
  } else {
    self[setting.property] = 0
  }
  tickTock(self, settings, remainder)
}

function createHourGlass (time, reference) {
  return new HourGlass(time, reference)
}

// Class Properties
createHourGlass.SECONDS_PER_YEAR = SECONDS_PER_YEAR
createHourGlass.SECONDS_PER_MONTH = SECONDS_PER_MONTH
createHourGlass.SECONDS_PER_WEEK = SECONDS_PER_WEEK
createHourGlass.SECONDS_PER_DAY = SECONDS_PER_DAY
createHourGlass.SECONDS_PER_HOUR = SECONDS_PER_HOUR
createHourGlass.SECONDS_PER_MINUTE = SECONDS_PER_MINUTE
