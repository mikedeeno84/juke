var app=angular.module("juke",[])

app.controller('MainControl', function($scope, $http){

	$scope.getArtists = function(song){
		return song.artists.map(function(artist){return artist.name}).join(", ");
	}
	$scope.currentSong = '';
	var trackIDs = [];
	var audio = document.createElement('audio');
	//grab list of albums
	var getAlbum = $http.get('/api/albums/565f6c85524e52611be16151');
	
	getAlbum.then(function(response) {
		$scope.album = response.data;
		$scope.album
		trackIDs = $scope.album.songs.map(function(song){return song._id});
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

	$scope.nextSong = function(){
		var trackIndex;
		trackIDs.forEach(function(trackID, index){
			if (trackID === $scope.currentSong) trackIndex = index +1;
		})
		if (trackIDs[trackIndex]) $scope.playSong(trackIDs[trackIndex]);
		else $scope.playSong(trackIDs[0]);

	}
	$scope.previousSong = function(){
	var trackIndex;
	trackIDs.forEach(function(trackID, index){
		if (trackID === $scope.currentSong) trackIndex = index -1;
	})
	if (trackIDs[trackIndex]) $scope.playSong(trackIDs[trackIndex]);
	else $scope.playSong(trackIDs[0]);

	}
	audio.addEventListener('timeupdate', function () {
	    $scope.progress = 100 * audio.currentTime / audio.duration;
	    $scope.$digest();
		});
});

app.controller('MainDisplay', function($scope){


})