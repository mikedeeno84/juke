var app=angular.module("juke",[])

app.controller('MainControl', function($scope, $http){

	$scope.getArtists = function(song){
		return song.artists.map(function(artist){return artist.name}).join(", ");
	}
	$scope.currentSong = '';
	var audio = document.createElement('audio');
	//grab list of albums
	var getAlbum = $http.get('/api/albums/565f2e9f4d3f39cd11d86986');
	
	getAlbum.then(function(response) {
		$scope.album = response.data;
		$scope.getAlbumImage = function() {
			return '/api/albums/' + response.data._id.toString() + '.image';	
		};
		$scope.playSong = function(songId) {
			if (!songId || $scope.currentSong === songId) return audio.play();
				
			audio.pause();
			$scope.currentSong = songId;
			audio.src = '/api/songs/' + songId + '.audio';
			audio.load();
			audio.play();
		}
		
		$scope.pauseSong = function() {
			audio.pause();
		}
	});
	
	$scope.isPlaying = function() {
		return !audio.paused;
	}
});

app.controller('MainDisplay', function($scope){


})