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
    const noBreaks = R.map(R.replace(/(?:\r\n|\r|\n|\t)/g, ''), sentences)
    console.log(noBreaks)
  })
