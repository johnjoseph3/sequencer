angular.module('app').service('Sequencer', function() {

	const audioContext = new AudioContext();
	let noteTime, startTime, rhythmIndex, loopLength, timeoutId, requestId, source;
	let beat = [];

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
			getAudioBuffer('http://localhost:8080/4.wav')
		]);
	};

	this.updateBeat = function(sound, beatIndex) {
		if (beat[beatIndex] === sound) {
			beat[beatIndex] = undefined;
		} else {
			beat[beatIndex] = sound;
		}
		return beat;
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
		loopLength = 12;
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

	function schedule() {
		let currentTime = audioContext.currentTime;
		currentTime -= startTime;

		while (noteTime < currentTime + 0.200) {
			let contextPlayTime = noteTime + startTime;
			//Insert draw stuff here
			if(beat[rhythmIndex]) {
				playSound(beat[rhythmIndex]);
			}
			advanceNote();
		}
		requestId = requestAnimationFrame(schedule, 0);
	}

	function advanceNote() {
		let tempo = 30.0;
		let secondsPerBeat = 60.0 / tempo;

		rhythmIndex++;
		if (rhythmIndex == loopLength) {
			rhythmIndex = 0;
		}
		noteTime += 0.25 * secondsPerBeat;
	}

});
