const env = require('dotenv').config();

let keys = require('./keys');
const axios = require("axios");

let Bandsintown = require('Bandsintown');
let Spotify = require ('node-spotify-api');
let fs = require('fs');

let Omdb = require('omdb');
let userCommand = process.argv[2];


let request = process.argv.slice(3).join(' ')

let moment = require("moment");


var spotify = new Spotify(keys.spotify);

var spotify = function() {
    if (!request) {   
        request = "The Sign Ace of base";
    }
    spotify.search({ 
        type: 'track', 
        query: request }, 
        function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } 
        var trackInfo = data.tracks.items

        var i = 0;
        // console.log(data.tracks.items[i]);

        // Confirms track exists
        while (data.tracks.items[i] != "undefined") {

            // Return first 5 results
            if (i > 4) { break; }
        //Loop through all the track information array
        for (var i = 0; i < trackInfo.length; i++) {
            //Store album object as var
            var albumObject = trackInfo[i].album;
            var trackName = trackInfo[i].name
            var preview = trackInfo[i].preview_url
            //Artist name from spotify api based off search
            var artist = albumObject.artists
            //Loop through all of the artist array
            for (var j = 0; j < artist.length; j++) {
                console.log("Artist: " + artist[j].name)
                console.log("Song Name: " + trackName)
                console.log("Preview of Song: " + preview)
                console.log("Album Name: " + albumObject.name)
                console.log("----------------")

                i++
            }
        }
        }
    });
}
let omdb = function() {
    axios
    .get(keys.omdb)
    .then(function(err, data){
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } 
            
    })
    
}

function mySwitch(userCommand) {
    switch (userCommand) {
        case "concert-this":
        bandsintown(userCommand);
        break;
    
        case "spotify-this-song":
        spotify(userCommand);
        break;
    
        case "movie-this":
        omdb(userCommand);
        break;
    
        case "do-what-it-says":
        doit();
        break;
    };
}
// bandsintown();
mySwitch(userCommand);