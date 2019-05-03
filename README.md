# liri-bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. 
#### Each time you run a command, the data returned will print to the log.txt file

## Deployment
Clone repo
Run npm install
At command prompt run node liri.js <pass in an instruction from above>

## do-what-it-says command
after the user enters the do-what-it-says command, the song/command that is in the random.txt file will be parsed and used as a default value for the search/command
![](https://cl.ly/0f10e95155ae/Screen%252520Recording%2525202019-05-03%252520at%25252001.52%252520PM.gif)

## spotify-this-song command
after the user enters the spotify-this-song command, the song that is entered following the command, will populate the song data after querying against Spotify's API using Axios. 
![](https://cl.ly/8691e6bfb537/Screen%252520Recording%2525202019-05-03%252520at%25252002.06%252520PM.gif)

## movie-this command
Once the user enteres the movie-this command, every character after the command will be included in the search of the OMDB API using axios. 
![](https://cl.ly/497d04a915a0/Screen%252520Recording%2525202019-05-03%252520at%25252002.09%252520PM.gif)

## concert-this command
Once the user enteres the concert-this command, every character after the command will be included in the search of the Bandsintown API using axios. 
![](https://cl.ly/0eb2240c1869/Screen%252520Recording%2525202019-05-03%252520at%25252002.10%252520PM.gif)

### Technologies Utilized
* NodeJS
* JavaScript
* Spotify API
* OMDB API
* Bandsintown API
* OMDB API
* NPM node-spotify-api
* NPM dotenv
* NPM bandsintown
* NPM axios
* NPM fs

