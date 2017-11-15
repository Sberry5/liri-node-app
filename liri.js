//Require keys and require npm
var keys = require('./keys.js');
var request = require('request');

//Variables to grab user command and argument to be passed to each call
var command = process.argv[2];
var argumentIn = process.argv;
var searchThis = "";

// function test(){
// 	for (var i = 3; i < argumentIn.length; i++){
// 	console.log(argumentIn[i]);
// 	};
// }
// test();


//Loop through user input to grab the movie name. Code allows users to input multi-word movie names.

if (argumentIn.length  < 3){
	console.log("You need to enter a name");
}
else if (argumentIn.length == 3){
	searchThis += argumentIn[i];
	console.log(searchThis);
}
else {
	for (var i = 3; i < argumentIn.length; i++){
		searchThis += argumentIn[i];
		//console.log(searchThis);
	}
}
console.log(searchThis);

// for (var i = 3; i < process.argv.length; i++) {
//   if (i == 3 && i < process.argv.length) {
//     searchThis += argumentIn[i];
//       console.log("search "+ searchThis);
//   }
//   else {
//     searchThis += argumentIn[i];
//   }
// };

console.log(process.argv.length)

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


/*--------Code to handle OMDB call--------*/
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

/*--------Code to handle Spotify call--------*/
function spotifyRun(){
	console.log("spotifyfun")

//Variable to 'require' the spotify npm
var Spotify = require('node-spotify-api');

var spotify = new Spotify ({
	 id: keys.spotifyKeys.id,
	 secret: keys.spotifyKeys.secret
});
 console.log("spotifyKeys");
 console.log(searchThis);

// spotify.search({ type: 'track', query: searchThis}, function(error, data) {
//     if(error) {
//       console.log('Error occurred: ' + error);
//       return;
//     }
//     var albumInfo = data.tracks.items[0];
//     var spotifyResults = 
//       "Artist: " + albumInfo.artists[0].name + "\n" +
//       "Track Name: " + albumInfo.name + "\n" +
//       "Album: " + albumInfo.album.name + "\n" +
//       "Preview Link: " + albumInfo.preview_url + "\n";
//     console.log(spotifyResults);
//   });

};



// /*--------Code to handle Twitter call--------*/

//function twitterRun(){


//End switch cases
}