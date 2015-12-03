app.controller('AlbumControl', function($scope, $rootScope, $http){
	var $this=this;

	$this.getArtists = function(song){
		return song.artists.map(function(artist){return artist.name}).join(", ");
	}
	var trackIDs = [];

	var getAlbum = $http.get('/api/albums/565f6c85524e52611be16151');

	//mike: 565f6c85524e52611be16151
	//sam: 565f2e9f4d3f39cd11d86986
	getAlbum.then(function(response) {

		$this.album = response.data;

		trackIDs = $this.album.songs.map(function(song){return song._id});
		
		$rootScope.$broadcast('albumLoaded', trackIDs);
		
		$this.getAlbumImage = function() {
			return '/api/albums/' + response.data._id.toString() + '.image';	
		};
		
	});
	$this.playSong = function(songID){
		$rootScope.$broadcast('playClicked', songID)
	}
	$this.pauseSong = function(){
		$rootScope.$broadcast('pauseClicked');
	}
	$this.isPlaying = false;
	$this.currentSong = '';
	
	$rootScope.$on('play',function(eventInfo, currentSong){
		$this.isPlaying = true;
		$this.currentSong = currentSong;
		$scope.$digest();
	})
	$rootScope.$on('pause',function(eventInfo){
		$this.isPlaying = false;
		$scope.$digest();
	})
});