require("dotenv").config();
const request = require("request-promise");
var keys = require("./keys.js");

var Twitter = require("twitter");
var twitter = new Twitter(keys.twitter);
var handle = {screen_name: 'justBBarnett'};

var command = process.argv[2]



