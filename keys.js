console.log("Hi! I'm liri.");
console.log("I can do a few things:" +
            "\n \t Want to see 20 tweets? Type my-tweets" +
            "\n \t Want to know about a movie? Type movie-this and your movie")

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};
