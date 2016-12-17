angular.module('app').service('Sequencer', function() {

	const audioContext = new AudioContext();
	let noteTime, startTime, rhythmIndex, timeoutId, requestId, source;
	let beat = [];
	let tempo = 120;
	let loopLength = 12;
	const self = this;

	function getAudioBuffer(soundFileUrl) {
		let promise = new Promise(function(resolve, reject) {
			let request = new XMLHttpRequest();
			request.open('get', soundFileUrl, true);
			request.responseType = 'arraybuffer';
			request.onload = function(){
				audioContext.decodeAudioData(request.response, function(buffer){
					resolve(buffer);
				}, function(){reject("Failed to load song");});
			};
			request.send();
		});
		return promise;
	}

	this.getSounds = function() {
		return Promise.all([
			getAudioBuffer('http://localhost:8080/1.wav'),
			getAudioBuffer('http://localhost:8080/2.wav'),
			getAudioBuffer('http://localhost:8080/3.wav'),
			getAudioBuffer('http://localhost:8080/4.wav'),
			getAudioBuffer('http://localhost:8080/5.wav'),
			getAudioBuffer('http://localhost:8080/6.wav'),
			getAudioBuffer('http://localhost:8080/7.wav'),
			getAudioBuffer('http://localhost:8080/8.wav')
		]);
	};

	this.getTempo = function() {
		return tempo;
	};

	this.updateBeat = function(sound, beatIndex) {
		if (beat[beatIndex] === sound) {
			beat[beatIndex] = undefined;
		} else {
			beat[beatIndex] = sound;
		}
		return beat;
	};

	this.updateTempo = function(newTempo) {
		tempo = parseInt(newTempo);
	};

	this.playSound = function(buffer) {
		let source = audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(audioContext.destination);
		source.start(0);
	};

	this.start = function(){
		noteTime = 0.0;
		startTime = audioContext.currentTime + 0.2;
		rhythmIndex = 0;
		self.rhythmIndex = rhythmIndex;
		schedule();
	};

	this.stop = function() {
		cancelAnimationFrame(requestId);
	};

	function playSound(sound) {
		source = audioContext.createBufferSource();
		source.buffer = sound;
		source.connect(audioContext.destination);
		source.start(0);
	}

	const highlightCurrentlyPlayingSounds = function(rhythmIndex) {
		let lastPlayedSounds = angular.element(document.querySelectorAll(`[data-beatIndex='${(rhythmIndex + loopLength - 1) % loopLength}']`));
		let currentlyPlayingSounds = angular.element(document.querySelectorAll(`[data-beatIndex='${rhythmIndex}']`));
		lastPlayedSounds.removeClass('playing');
		currentlyPlayingSounds.addClass('playing');
	};

	function schedule() {
		let currentTime = audioContext.currentTime;
		currentTime -= startTime;

		while (noteTime < currentTime + 0.200) {
			let contextPlayTime = noteTime + startTime;

			if(beat[rhythmIndex]) {
				playSound(beat[rhythmIndex]);
			}

			highlightCurrentlyPlayingSounds(rhythmIndex);

			advanceNote();
		}
		requestId = requestAnimationFrame(schedule, 0);
	}

	function advanceNote() {
		let secondsPerBeat = 60.0 / tempo;

		rhythmIndex++;
		self.rhythmIndex = rhythmIndex;
		if (rhythmIndex == loopLength) {
			rhythmIndex = 0;
		}
		noteTime += 0.25 * secondsPerBeat;
	}

});
