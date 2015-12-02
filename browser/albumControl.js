app.controller('AlbumControl', function($scope, $rootScope, $http){

	$scope.getArtists = function(song){
		return song.artists.map(function(artist){return artist.name}).join(", ");
	}
	var trackIDs = [];

	var getAlbum = $http.get('/api/albums/565f6c85524e52611be16151');

	getAlbum.then(function(response) {
		$scope.album = response.data;
		$scope.album
		trackIDs = $scope.album.songs.map(function(song){return song._id});
		$scope.getAlbumImage = function() {
			return '/api/albums/' + response.data._id.toString() + '.image';	
		};
		
	});
	$scope.playSong = function(songID){
		$rootScope.$broadcast('playClicked', songID)
	}
	$scope.pauseSong = function(){
		$rootScope.$broadcast('pauseClicked');
	}
	$scope.isPlaying = false;
	
	$rootScope.$on('play',function(eventInfo){
		$scope.isPlaying = true;
	})
	$rootScope.$on('pause',function(eventInfo){
		$scope.isPlaying = false;
	})
});