

require("dotenv").config();
var fs = require("fs");
const request = require("request-promise");
const chalkAnimation = require('chalk-animation');

var keys = require("./keys.js");

var command = process.argv[2];






function liri (){
    
    switch (command){
        case 'my-tweets':

            var handle = process.argv[3];
            var twitterHandle = {screen_name: handle};
            
            console.log(twitterHandle);

            var Twitter = require("twitter");
            var twitter = new Twitter(keys.twitter);

            twitter.get('statuses/user_timeline', twitterHandle, function(error, tweets, response){

                
                // console.log("response: " + JSON.stringify(response));

                if (!error) {
                    for (i=10; i>0; i--) {
                        
                        console.info( "\t" + tweets[i].created_at + ": ")
                        console.log("\t" + tweets[i].text,'\n')
                    }
                }
                
            })


        

        break;

        case 'movie-this':

            var input = process.argv.splice(3, process.argv.length - 1).join(' ')
            let omdb = 'http://www.omdbapi.com?t=' + encodeURIComponent(input) + '&r=json&plot=short&apikey=trilogy'
        
            request(omdb)
            .then(response =>{
                let movieData = JSON.parse(response);
                console.log("\n \t Title:" + movieData.Title +
                            "\n \t Release Year:" + movieData.Year +
                            "\n \t IMDB Rating:" + movieData.Ratings[0].Value +
                            "\n \t Rotten Tomatoes:" + movieData.Ratings[1].Value +
                            "\n \t Release Country:" + movieData.Country +
                            "\n \t Language:" + movieData.Language +
                            "\n \t Plot:" + movieData.Plot +
                            "\n \t Actors:" + movieData.Actors);
            })  


        break;

        case 'do-what-it-says':
        break;

        case undefined:
            chalkAnimation.rainbow ("Hi! I'm liri.");
           
            console.log("I can do a few things:" +
                    "\n \t Want to see 20 tweets? Type my-tweets + The Twitter handle" +
                    "\n \t Want to know about a movie? Type movie-this and your movie")
        break;
    }
}

liri ();



