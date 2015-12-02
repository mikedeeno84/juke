
app.controller('PlayerControl', function($scope, $rootScope){


	$scope.currentSong = '';
	var audio = document.createElement('audio');
	//grab list of albums

	//stuff is in seperate controller

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

	var playSong = function(songId) {
			if (!songId || $scope.currentSong === songId) return audio.play();
				
			audio.pause();
			$scope.currentSong = songId;
			audio.src = '/api/songs/' + songId + '.audio';
			audio.load();
			audio.play();
		}
		
	var pauseSong = function() {
			audio.pause();
		}
	$rootScope.$on('playClicked', function(eventInfo, songId){
	playSong(songId);
	});

	$rootScope.$on('pauseClicked', function(eventInfo){
	pauseSong();
	});

	audio.addEventListener('onplaying', function(){
		$rootScope.$broadcast('play');
	})
	audio.addEventListener('onpause', function(){
		$rootScope.$broadcast('pause');
	})
});









