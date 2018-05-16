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

HourGlass.prototype.friendly = function HourGlass$friendly () {
  let formatted = formatDate(this.reference)
  let string = ''

  if (this.years) {
    let years = Math.abs(this.years)
    if (years > MILLION) {
      string += (this.years / MILLION).toString() + ' Million Years, '
    } else if (years > THOUSAND) {
      string += (this.years / THOUSAND).toString() + ' Thousand Years, '
    } else if (years > HUNDRED) {
      string += (this.years / HUNDRED).toString() + ' Hundred Years, '
    } else {
      string += this.years.toString() + ' Years, '
    }
  }

  if (this.months) {
    string += this.months.toString() + ' Months, '
  }

  if (this.weeks) {
    string += this.weeks.toString() + ' Weeks, '
  }

  if (this.hours) {
    string += this.hours.toString() + ' Hours, '
  }

  if (this.minutes) {
    string += this.minutes.toString() + ' Minutes, '
  }

  string += ' From ' + formatted

  return string

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

HourGlass.prototype.serialize = function HourGlass$seralize () {
  return this.time.toString() + '|' + this.reference.valueOf()
}

function createHourGlass (time, reference) {
  return new HourGlass(time, reference)
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
