//linking to dot.env
const env = require('dotenv').config();

//linking to keys.js
const keys = require('./keys');

//bandsintown 
const Bandsintown = require('Bandsintown');
const bands = keys.bandsintown

//Spotify
const Spotify = require ('node-spotify-api');
const spotify = new Spotify(keys.spotify);

const fs = require('fs');
const axios = require('axios')

const Omdb = require('omdb');
let userCommand = process.argv[2];


let userEntry = process.argv.slice(3).join(' ')

let moment = require("moment");

const mySpotify = function(songName) {
    spotify.search({ 
        type: 'track', 
        query: userEntry }, 
        function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } 
        var trackInfo = data.tracks.items

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
                console.log("\nArtist: " + artist[j].name)
                console.log("Song Name: " + trackName)
                console.log("Preview of Song: " + preview)
                console.log("Album Name: " + albumObject.name)
                console.log("----------------\n")
            }
        }
    });
}
const myBandsintown = function(response) {
    
    var appKey = 'codingbootcamp'
    var url = 'https://rest.bandsintown.com/artists/' + userEntry + '/events?app_id=' + appKey;
    axios.get(url).then(
        function(response) {
            if (typeof response.data[0] === undefined) {
                
            }
            for (let i = 0; i < response.data.length; i++) {
                const concerts = response.data[i];
                const venueName = concerts.venue.name;
                const date = concerts.datetime;
                const artist = userEntry.toUpperCase();
                const location = concerts.venue.city;
                
                console.log('\nArtist: ' + artist);
                console.log('Concert Date: ' + date);
                console.log('Venue Name: ' + venueName);
                console.log('City: ' + location);
                console.log('------------\n');
                
                
            }

        }
    )
}
function omdb() {
    axios
    .get(keys.omdb)
    .then(function(err, data){
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } 
        console.log(data);
        
    })
}

function mySwitch(userCommand) {
    switch (userCommand) {
        case "concert-this":
        myBandsintown(userCommand);
        break;
    
        case "spotify-this-song":
        mySpotify(userCommand);
        break;
    
        case "movie-this":
        omdb(userCommand);
        break;
    
        case "do-what-it-says":
        doit();
        break;
    };
}
mySwitch(userCommand);