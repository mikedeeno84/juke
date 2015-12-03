
app.controller('PlayerControl', function($scope, $rootScope){
	var $this=this;

	$this.currentSong = '';
	var trackIDs;
	var audio = document.createElement('audio');
	var shuffleList;
	var orderedList;
	$this.shuffleOn = false;
	
	//grab list of albums

	//stuff is in seperate controller

	$this.isPlaying = function() {
		return !audio.paused;
	}

	//fix $this error
	$this.nextSong = function(){
		var trackIndex;
		var nowSong = $this.currentSong;
		trackIDs.forEach(function(trackID, index){
			if (trackID === nowSong) trackIndex = index +1;
		})
		if (trackIDs[trackIndex]) $this.playSong(trackIDs[trackIndex]);
		else $this.playSong(trackIDs[0]);

	}

	//fix $this error
	$this.previousSong = function(){
	var trackIndex;
	var nowSong = $this.currentSong;
	trackIDs.forEach(function(trackID, index){
		if (trackID === nowSong) trackIndex = index -1;
	})
	if (trackIDs[trackIndex]) $this.playSong(trackIDs[trackIndex]);
	else $this.playSong(trackIDs[0]);

	}
	audio.addEventListener('timeupdate', function () {
	    $this.progress = 100 * audio.currentTime / audio.duration;
	    $scope.$digest();
		});

	$this.playSong = function(songId) {
			if (!songId || $this.currentSong === songId) return audio.play();
				
			audio.pause();
			$this.currentSong = songId;
			audio.src = '/api/songs/' + songId + '.audio';
			audio.load();
			audio.play();
		}
		
	$this.pauseSong = function() {
		audio.pause();
	}
	
	$this.playRandom = function() {
		if ($this.shuffleOn) {
			$this.shuffleOn = false;
			trackIDs = orderedList;
			audio.pause();
			return;
		}
		
		$this.shuffleOn = true;
		var copyOfTrackIDs = trackIDs.slice();
		var newTrackIndex = [];
		
		while (copyOfTrackIDs.length > 0) {
			var randomIndex = Math.floor(Math.random() * copyOfTrackIDs.length);
			newTrackIndex.push(copyOfTrackIDs.splice(randomIndex, 1)[0]);
		}
		
		shuffleList = newTrackIndex;
		trackIDs = shuffleList;
		
		$this.playSong(trackIDs[0]);
	}
	
	$rootScope.$on('albumLoaded', function(eventInfo, incomingTrackIds) {
		orderedList = incomingTrackIds;
		trackIDs = orderedList;
	})
	
	$rootScope.$on('playClicked', function(eventInfo, songId){
	$this.playSong(songId);
	});

	$rootScope.$on('pauseClicked', function(eventInfo){
	$this.pauseSong();
	});
	
	audio.addEventListener('play', function(){
		$rootScope.$broadcast('play', $this.currentSong);
	});
	audio.addEventListener('pause', function(){
		$rootScope.$broadcast('pause');
	});
	audio.addEventListener('ended', function() {
		$this.nextSong();
	});	
	
	$this.progressBarClick = function($event) {
		var totalWidth;
		var percentComplete;
		var targetTime;
		
		totalWidth = $event.currentTarget.clientWidth

		percentComplete = $event.layerX / totalWidth;
		targetTime = audio.duration * percentComplete;
		audio.currentTime = targetTime;
	}
});