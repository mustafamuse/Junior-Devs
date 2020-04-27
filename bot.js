const Twit = require("twit");
const config = require("./config");

const myBot = new Twit(config);

const keywords = [
  "hiring entry-level developer,",
  "hiring entry level software developer,",
  "hiring entry-level software engineer,",
  "junior software engineer openings,",
  "all levels software engineers role,",
  "all levels software developers role,",
  "junior developer openings,",
  "junior software developer openings,",
  "junior engineer openings,",
  "hiring associate developer,",
  "hiring associate software developer,",
  "hiring associate software engineer,",
  "looking for junior developer,",
  "looking for junior software engineer,",
  "looking for associate developer,",
  "looking for associate software engineer,",
  "looking for entry-level software engineer,",
  "looking for entry-level software developer,",
  "looking for junior frontend engineer,",
  "looking for junior backend engineer,",
  "hiring junior backend engineer,",
  "hiring junior frontend engineer,",
  "hiring entry-level web designer,",
  "hiring new grad software engineer,",
  "hiring new grad software developer,",
  "hiring new-grad software engineer,",
  "hiring new-grad software developer,",
  " hiring entry-level developer,",
  " hiring entry level software developer,",
  " hiring entry-level software engineer,",
  " junior software engineer openings,",
  " junior software developer openings,",
  " junior developer openings,",
  " junior engineer openings,",
  " hiring associate developer,",
  " hiring associate software developer,",
  " hiring associate software engineer,",
  " looking for junior developer,",
  " looking for junior software engineer,",
  " looking for associate developer,",
  " looking for associate software engineer,",
  " looking for entry-level software engineer,",
  " looking for entry-level software developer,",
  " looking for junior frontend engineer,",
  " looking for junior backend engineer,",
  " hiring junior backend engineer,",
  " hiring junior frontend engineer,",
  " hiring entry-level web designer,",
  " hiring new grad software engineer,",
  " hiring new grad software developer,",
  " hiring new-grad software engineer,",
  " hiring new-grad software developer,",
];

let prevIndex = 0;
const searchTerms = (keywordsArray) => {
  let randomIndex = Math.floor(Math.random() * (keywordsArray.length - 1));
  prevIndex = randomIndex;
  return keywordsArray[randomIndex];
};


retweetJobPosts = () => {
  //create a function to call on with the set Interval
  const params = {
    //set the params needed for the search request
    q: searchTerms(keywords),
    result_type: "recent",
    lang: "en",
  };
  searchedTweets(params); //search for the tweets with our params
};

searchedTweets = (params) => {
  myBot.get("search/tweets", params, (err, data) => {
    if (err) {
      console.log(`YOU GOT THIS ERROR: ${err.message}`);
    } else {
      let tweets = data.statuses; // grab recent tweets
      // console.log(tweets)
      tweets.forEach((tweet) => {
        let retweetId = tweet.id_str; // grab the id string to use it to retweet
        // console.log(retweetId)
        postNewTweets(retweetId); // call on the function that will retweet the new job tweets
      });
    }
  });
};

postNewTweets = (retweetId) => {
  myBot.post("statuses/retweet/:id", { id: retweetId }, (err, data) => {
    data ? console.log("found one and retweeted it! ") : console.log(`YOU GOT THIS ERROR: ${err.message}`);
  });
};




//This is to see if my bot is down or not
let botIsDown = false;

botStatusCheck = (err) => {
  // Check if our tweet has been successful, if we've reached our rate limit, let people know that our bot is asleep.
  if (err !== undefined) {
    console.log(err);
    if (err.code === 88) {
      // meaning i exceeded my rate limit
      imDown();
      botIsDown = true;
    }
  } else {
    if (botIsDown) {
      botIsDown = false;
      liveAgain();
    }
  }
};

function imDown() {
  myBot.post(
    "account/update_profile",
    {
      name: "Junior Dev Jobs",
      description:
        "They caught on to me today,i guess i reached my rate limit. See you tomorrow",
    },
    botStatusCheck
  );
}
function liveAgain() {
  myBot.post(
    "account/update_profile",
    {
      name: "Junior Dev Bot",
      description: "Out here doing to make sure you get your chance",
    },
    botStatusCheck
  );
}

tasks = () => {
  retweetJobPosts(), botStatusCheck();
};

setInterval(tasks, 15000);
