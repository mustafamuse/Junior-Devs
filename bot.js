
const Twit = require('twit')
const config = require('./config')



const myBot = new Twit(config);

myBot.post('statuses/update', {
    status: 'We Are Live Babyyyyyy!'
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
        console.log(data)
      console.log(`${data.text} tweeted!`)
    }
  })
