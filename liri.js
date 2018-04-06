

require("dotenv").config();
var fs = require("fs");
const request = require("request-promise");
const chalkAnimation = require('chalk-animation');
var colors = require('colors');

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

                if (!error) {
                    console.log ((handle + "'s last 20 tweets:").inverse)
                    for (i=0 ; i < 20 ; i++) {
                        console.log( ("\t" + tweets[i].created_at + ": ").cyan)
                        console.log("\t" + tweets[i].text,'\n')
                    }
                }   
                if (error) {
                    console.log (("There seems to be an error. Make sure your provided a real Twitter handle in your command.").inverse)
                }           
            })
        break;

        case 'movie-this':

            var input = process.argv[3];

            if (!input) {
                console.log ("\n You didn't ask for a movie, so I will give you my favorite!".inverse)
                var movie = "forrest-gump"
            }
            else {
                var movie = process.argv.splice(3, process.argv.length - 1).join(' ')
            }

            let omdb = 'http://www.omdbapi.com?t=' + encodeURIComponent(movie) + '&r=json&plot=short&apikey=trilogy'
            request(omdb)
            .then(response =>{
                let movieData = JSON.parse(response);
                console.log("\n ------------------------------------------" +
                            "\n \t Title: ".cyan.underline + movieData.Title +
                            "\n \t Release Year: ".cyan.underline + movieData.Year +
                            "\n \t IMDB Rating: ".cyan.underline + movieData.Ratings[0].Value +
                            "\n \t Rotten Tomatoes: ".cyan.underline + movieData.Ratings[1].Value +
                            "\n \t Release Country: ".cyan.underline + movieData.Country +
                            "\n \t Language: ".cyan.underline + movieData.Language +
                            "\n \t Plot: ".cyan.underline + movieData.Plot +
                            "\n \t Actors: ".cyan.underline + movieData.Actors + 
                            "\n ------------------------------------------");
            })  
        break;

        case 'do-what-it-says':
            fs.readFile("random.txt", "utf-8", function (error, data){
                if (!error){
                    var pullData = data.split(", ");
                    console.log(pullData)

                    var command = pullData[0];
                    var input = pullData[1];
                    console.log("command: " + command + "\t input: " + input)
                    
                    liri();
                }
            })
        break;

        case undefined:
            console.log("Hi! I'm liri.".bold.cyan);
           
            console.log("I can do a few things:".cyan +
                    "\n \t Want to see 20 tweets? Type my-tweets + The Twitter handle" +
                    "\n \t Want to know about a movie? Type movie-this and your movie")
        break;
    }
}

liri ();



