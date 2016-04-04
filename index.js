import request from 'superagent'
import R from 'ramda'
import cheerio from 'cheerio'

const testUrl = 'https://en.wikipedia.org/wiki/Belisarius'

request
    .get(testUrl)
    .end((err, data) => {
      if (err) {
      console.log(err)
    }
    const stripped = R.replace(/(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g,'', data.text)
    const sentences = R.split('.', stripped)
    const noBreaks = R.map(R.replace(/(?:\r\n|\r|\n|\t)|\[edit\]/g, ''), sentences)
    const years = R.filter(findYears, noBreaks)
    const sortedYears = R.sort(sortByYear, years)
    console.log(sortedYears)
  })


function findYears(string) {
  const foundYears = R.match(/\d{4}|\d{3}/, string)
  return foundYears.length > 0
}

function sortByYear(a, b) {
  const yearA = R.match(/\d{4}|\d{3}/, a)
  const yearB = R.match(/\d{4}|\d{3}/, b)
  return yearA[0] - yearB[0]
}
