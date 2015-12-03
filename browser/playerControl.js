
app.controller('PlayerControl', function($scope, $rootScope){


	$scope.currentSong = '';
	var trackIDs;
	var audio = document.createElement('audio');
	var shuffleList;
	var orderedList;
	$scope.shuffleOn = false;
	
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
	
	$scope.playRandom = function() {
		if ($scope.shuffleOn) {
			$scope.shuffleOn = false;
			trackIDs = orderedList;
			audio.pause();
			return;
		}
		
		$scope.shuffleOn = true;
		var copyOfTrackIDs = trackIDs.slice();
		var newTrackIndex = [];
		
		while (copyOfTrackIDs.length > 0) {
			var randomIndex = Math.floor(Math.random() * copyOfTrackIDs.length);
			newTrackIndex.push(copyOfTrackIDs.splice(randomIndex, 1)[0]);
		}
		
		shuffleList = newTrackIndex;
		trackIDs = shuffleList;
		
		$scope.playSong(trackIDs[0]);
	}
	
	$rootScope.$on('albumLoaded', function(eventInfo, incomingTrackIds) {
		orderedList = incomingTrackIds;
		trackIDs = orderedList;
	})
	
	$rootScope.$on('playClicked', function(eventInfo, songId){
	$scope.playSong(songId);
	});

	$rootScope.$on('pauseClicked', function(eventInfo){
	$scope.pauseSong();
	});
	
	audio.addEventListener('play', function(){
		console.log($scope.currentSong);
		$rootScope.$broadcast('play', $scope.currentSong);
	});
	audio.addEventListener('pause', function(){
		$rootScope.$broadcast('pause');
	});
	audio.addEventListener('ended', function() {
		$scope.nextSong();
	});	
	
	$scope.progressBarClick = function($event) {
		var totalWidth;
		var percentComplete;
		var targetTime;
		
		totalWidth = $event.currentTarget.clientWidth

		percentComplete = $event.layerX / totalWidth;
		targetTime = audio.duration * percentComplete;
		audio.currentTime = targetTime;
	}
});









