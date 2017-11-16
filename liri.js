//Require keys and require npm
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var fs = require('fs');
var Spotify = require('node-spotify-api');


//Variables to grab user command and argument to be passed to each call
//Variable to grab user search
var argumentIn = process.argv;
var input = process.argv.splice(2);
var command = input.shift();
//Variable to hold user search
var searchThis = input.join(" ");


//Loop through user input to grab the movie name. Code allows users to input multi-word movie names.


/*--------Switch to run different calls depending on user input--------*/
switch(command){
	case "movie-this":
		omdbRun();
		break;
	case "spotify-this-song":
		spotifyRun(searchThis);
		break;
	case "my-tweets":
		twitterRun();
		break;
	case "do-what-it-says":
		readFile();
		break;


/*--------Code to handle OMDB call--------*/
function omdbRun() {

var queryUrl = "http://www.omdbapi.com/?t=" + searchThis + "&y=&plot=short&apikey=" + keys.omdbKeys.apiKey;
//console.log(queryUrl);

request(queryUrl, function(error, response, body) {

//If the request is successful
  if (!error && response.statusCode === 200) {

//Parse through data returned from API and show required data to user
    console.log("Title:" + JSON.parse(body).Title + 
    	"\nRelease Year: " + JSON.parse(body).Year + 
    	"\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + 
    	"\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + 
    	"\nCountry Produced: " + JSON.parse(body).Country + 
    	"\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + 
    	"\nActors " + JSON.parse(body).Actors);
	}

	// else if(searchThis === "") {
	// 	searchThis += ";
	// }

	else {
		console.log("Error " + error)
	}
  });
};

/*--------Code to handle Spotify call--------*/
function spotifyRun(){

//Default variable for spotify
var spotifyDefault = ""

var spotify = new Spotify ({
	 id: keys.spotifyKeys.id,
	 secret: keys.spotifyKeys.secret
});


spotify.search({ type: 'track', query: searchThis}, function(error, data) {
    if(error) {
      console.log('Error occurred: ' + error);
      return;
    }

    var albumInfo = data.tracks.items[0];
    var spotifyResults = 
      "Artist: " + albumInfo.artists[0].name + "\n" +
      "Track Name: " + albumInfo.name + "\n" +
      "Album: " + albumInfo.album.name + "\n" +
      "Preview Link: " + albumInfo.preview_url + "\n";
    console.log(spotifyResults);
  });

};



// /*--------Code to handle Twitter call--------*/

function twitterRun(){
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});
	 
	var params = {screen_name: 'SbhNWC', count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	  	console.log('Error occurred: ' + error);
	  }

	  else{
	  	for (var i = 0; i < tweets.length; i++) {
			tweets[i];
	  	console.log('\nDate created: ' + tweets[i].created_at + '\nTweet: ' + tweets[i].text)
	  }
	};
});
}

/*--------Code to handle "Do what it says" command--------*/

function readFile(){

//Use fs to read the random.txt file
    fs.readFile("random.txt", "utf8", function (err, data) {

//Console.log any error received
        if (err) {
            return console.log(err);
        }

//Split the data in random.txt by commas
        var dataSplit = data.split(",");

//Switch searchThis with the first index from data
        searchThis = dataSplit[1];

        // Console log the array
        //console.log(data);

//Call out spotify function so it gives song information
        spotifyRun();

    });

}

//End switch case
}

