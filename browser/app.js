var app=angular.module("juke",[])

app.controller('MainControl', function($scope){

	$scope.album = {
	    name: 'Abbey Road',
	    imageUrl: 'http://fillmurray.com/300/300',
	    songs: [{
	        name: 'Romeo & Juliette',
	        artists: [{name: 'Bill'}],
	        genres: ['Smooth', 'Funk'],
	        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3'
	    }, {
	        name: 'White Rabbit',
	        artists: [{name: 'Bill'}, {name: 'Bob'}],
	        genres: ['Fantasy', 'Sci-fi'],
	        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2008.mp3'
	    }, {
	        name: 'Lucy in the Sky with Diamonds',
	        artists: [{name: 'Bob'}],
	        genres: ['Space'],
	        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2001.mp3'
	    }]
	};

	$scope.getArtists = function(song){
		return song.artists.map(function(artist){return artist.name}).join(", ");
	}






})

app.controller('MainDisplay', function($scope){


})