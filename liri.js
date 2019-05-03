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
            let albumObject = trackInfo[i].album;
            let preview = trackInfo[i].preview_url
            //Artist name from spotify api based off search
            let artist = albumObject.artists
            let albumName = albumObject.name;
            //Loop through all of the artist array
            for (var j = 0; j < artist.length; j++) {
                
                console.log("\nArtist: " + artist[j].name)
                console.log("Song Name: " + userEntry.toUpperCase())
                console.log("Preview of Song: " + preview)
                console.log("Album Name: " + albumName);
                console.log("----------------\n")

                fs.appendFile("log.txt" + '\n', movieData, function(err) {
                    if (err) throw err;
                })
            }
        }
    });
}
const myBandsintown = function(response) {
    
    var appKey = 'codingbootcamp'
    var url = 'https://rest.bandsintown.com/artists/' + userEntry + '/events?app_id=' + appKey;
    axios.get(url).then(
        function(response) {
            //loop through each concert returned for an artist
            for (let i = 0; i < response.data.length; i++) {
                //store response into a variable
                let jsonData = response.data[i];

                // translate each data variable into an array
                let concertData = [
                    'Artist: ' + userEntry.toUpperCase(),
                    'Concert Date: ' + moment(jsonData.datetime).format('L'),
                    'Venue Name: ' + jsonData.venue.name,
                    'City: ' + jsonData.venue.city
                ].join('\n');
                
                // log data values to console
                console.log('\n---------');
                console.log(concertData);
                console.log('\n---------');
                
                // log data to txt file
                fs.appendFile("log.txt", concertData, function(err) {
                    if (err) throw err;
                })
            }

        }
    )
}
function omdb() {
    let url = 'http://www.omdbapi.com/?i=tt3896198&apikey='
    let movie = '"?t=" + userEntry'
    axios
    .get(url + keys.omdb.id + movie)
    .then(function(response){
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
        
        let jsonData = response.data[i];

        // translate each data variable into an array
        // let movieData = [
        //     'Movie Title: ' + userEntry.toUpperCase(),
        //     'Movie Release Date: ' + ,
        //     'IMDB Rating: ' + ,
        //     'Rotten Tomatoes Rating: ' + ,
        //     'Production Country: ' + ,
        //     'Movie Language: ' + ,
        //     'Plot: ' + ,
        //     'Main Actors: ' + ,
        // ].join('\n');
        console.log(jsonData);
        
        // log data values to console
        // console.log('\n---------');
        // console.log(movieData);
        // console.log('\n---------');
                

        fs.appendFile("log.txt", movieData, function(err) {
            if (err) throw err;
        })
    }
    })
    .catch(error => {
        console.log("Fuck.  Error.")
    });
}
function doIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } 

        let userCommand = data.indexOf(",");
        let songName = data.slice(userCommand + 2, data.length - 1);

        mySpotify(songName);

    });

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
        doIt();
        break;
    };
}
mySwitch(userCommand);