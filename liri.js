//Require keys.js folder
var keys = require('./keys.js');
var request = require('request');

/*--------Switch to run different calls depending on user input--------*/
var a = process.argV
switch(a){
	case "movie-this":
		ombdRun(argument);
		break;
	// case "my-tweets":
	// 	twitterRun();
	// 	break;
	// case "spotify-this-song":
	// 	spotifyRun();
	// 	break;
	// case default:
	// 	console.log("Hey, jerk, you know what you are supposed to enter");
	// 	break;
var searchThis = []
var command = process.argv[2];
var argument = process.argv[3];
//Loop through user input to grab the movie name. Code allows users to input multi-word movie names.
for (var i = 3; i < process.argv.length; i++) {
  searchThis += " " + process.argv[i]};

/*--------Code to handle OMDB--------*/

function omdbRun(argument) {
//Variable to 'require' request
//var request = require("request");

//Variable to hold command line arguments
//var omdbArgs = process.argv;

//Create an empty variable to hold the movie
// var movieName = argument;

//Loop through user input to grab the movie name. Code allows users to input multi-word movie names.
// for (var i = 2; i < omdbArgs.length; i++) {
//   if (i > 2 && i < omdbArgs.length) {
//     movieName = movieName + "+" + omdbArgs[i];
//   }
//   else {
//     movieName += omdbArgs[i];
//   }
// }

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
//console.log(queryUrl);

request(queryUrl, function(error, response, body) {

//If the request is successful
  if (!error && response.statusCode === 200) {

//Parse through data returned from API and show required data to user
    console.log("Title:" + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors " + JSON.parse(body).Actors);
	};
  });
};

// /*--------Code to handle Twitter--------*/
//function twitterRun(){

// //Variable to 'require' the spotify npm
// var Spotify = require('node-spotify-api', 'keys.js')


// //Variable to hold command line arguments
// var spotifyArgs = process.argv;

// //Create an empty variable to hold the movie
// var songName = "";

// // var spotifyKeys = require('keys.js');
// // console.log(spotifyKeys);

// var spotify = new Spotify (
// 	 'spotifyKeys'
// );
// // console.log(spotifyKeys);

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

};

// /*--------Code to handle Spotify--------*/

//function spotifyRun(){