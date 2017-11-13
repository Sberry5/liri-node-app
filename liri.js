//Require keys and require npm
var keys = require('./keys.js');
var request = require('request');

//Variables to grab user command and argument to be passed to each call
var command = process.argv[2];
var argument = process.argv[3];
var searchThis = "";

//Loop through user input to grab the movie name. Code allows users to input multi-word movie names.
for (var i = 3; i < argument.length; i++) {
  searchThis += " " + argument[i]};

// for (var i = 3; i < argument.length; i++) {
//   if (i > 3 && i < argument.length) {
//     searchThis = searchThis + "+" + argument[i];
//   }
//   else {
//     searchThis += argument[i];
//   }
// };



/*--------Switch to run different calls depending on user input--------*/
switch(command){
	case "movie-this":
		omdbRun(searchThis);
		break;
	case "spotify-this-song":
		spotifyRun(searchThis);
		break;
	// case "my-tweets":
	// 	twitterRun();
	// 	break;


/*--------Code to handle OMDB--------*/
function omdbRun() {

var queryUrl = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=" + keys.omdbKeys.apiKey;
//console.log(queryUrl);

request(queryUrl, function(error, response, body) {

//If the request is successful
  if (!error && response.statusCode === 200) {

//Parse through data returned from API and show required data to user
    console.log("Title:" + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors " + JSON.parse(body).Actors);
	}

	else {
		console.log("Error " + error)
	}
  });
};

/*--------Code to handle Spotify--------*/
function spotifyRun(){

//Variable to 'require' the spotify npm
var Spotify = require('node-spotify-api')

var spotify = new Spotify ({
	 id: keys.spotifyKeys.id,
	 secret: keys.spotifyKeys.secret
});
// console.log(spotifyKeys);

spotify
  .search({ type: 'track', query: 'searchThis' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

};

}

// /*--------Code to handle Twitter--------*/

//function twitterRun(){