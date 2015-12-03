app.controller('AlbumControl', function($scope, $rootScope, $http){

	$scope.getArtists = function(song){
		return song.artists.map(function(artist){return artist.name}).join(", ");
	}
	var trackIDs = [];

	var getAlbum = $http.get('/api/albums/565f2e9f4d3f39cd11d86986');

	//mike: 565f6c85524e52611be16151
	//sam: 565f2e9f4d3f39cd11d86986
	
	getAlbum.then(function(response) {
		$scope.album = response.data;
		$scope.album
		trackIDs = $scope.album.songs.map(function(song){return song._id});
		
		$rootScope.$broadcast('albumLoaded', trackIDs);
		
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
	$scope.currentSong = '';
	
	$rootScope.$on('play',function(eventInfo, currentSong){
		$scope.isPlaying = true;
		$scope.currentSong = currentSong;
		console.log($scope.currentSong);
		$scope.$digest();
	})
	$rootScope.$on('pause',function(eventInfo){
		$scope.isPlaying = false;
		$scope.$digest();
	})
});