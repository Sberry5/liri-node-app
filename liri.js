/*--------Code to handle OMDB--------*/

//Variable to 'require' request
var request = require("request");

//Variable to hold command line arguments
var nodeArgs = process.argv;

//Create an empty variable to hold the movie
var movieName = "";

//Loop through user input to grab the movie name. Code allows users to input multi-word movie names.
for (var i = 2; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
//console.log(queryUrl);

request(queryUrl, function(error, response, body) {

// If the request is successful
  if (!error && response.statusCode === 200) {
// Parse the body of the site and recover just the imdbRating
// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title:" + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors " + JSON.parse(body).Actors);
	};
});

//How to go into object and grab values when the attribute name is the smae
//"\nIMDB Rating: " + JSON.parse(body).Ratings.(Source: Internet Moive Database).Value)

/*--------Code to handle Twitter--------*/
var Spotify = require('node-spotify-api')



/*--------Code to handle Spotify--------*/
