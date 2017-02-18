import {availableSounds} from './sounds.js';

angular.module('app').service('Sequencer', function($location) {
	let AudioContext;
	let webAudioApiContext;
	const location = $location;
	const url = `${location.$$protocol}://${location.$$host}:${location.$$port}`;

	if(window.AudioContext) {
		AudioContext = window.AudioContext;
		webAudioApiContext = 'default';
	} else if (window.webkitAudioContext) {
		AudioContext = window.webkitAudioContext;
		webAudioApiContext = 'webkit';
	}	else {
		alert("Sorry, your browser does not support the Web Audio API. Try Google Chrome.");
	}

	const audioContext = new AudioContext();

	let noteTime, startTime, rhythmIndex, timeoutId, requestId, source;
	let pattern = [[],[],[],[],[],[],[],[],[],[],[],[]];
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

	this.getSound = function(sound, newSound) {
		return getAudioBuffer(`${url}/${sound.name}/${newSound}`);
	};

	this.getSounds = function() {
		return Promise.all([
			getAudioBuffer(`${url}/kick/${availableSounds.kick.sounds[0]}`),
			getAudioBuffer(`${url}/snare/${availableSounds.snare.sounds[0]}`),
			getAudioBuffer(`${url}/open-hat/${availableSounds.openHat.sounds[0]}`),
			getAudioBuffer(`${url}/closed-hat/${availableSounds.closedHat.sounds[0]}`),
			getAudioBuffer(`${url}/toms/${availableSounds.toms.sounds[0]}`),
			getAudioBuffer(`${url}/percussion/${availableSounds.percussion.sounds[0]}`),
			getAudioBuffer(`${url}/sample-fx/${availableSounds.sampleFx.sounds[0]}`),
			getAudioBuffer(`${url}/synth/${availableSounds.synth.sounds[0]}`)
		]);
	};

	this.getTempo = function() {
		return tempo;
	};

	this.getPattern = function() {
		return pattern;
	};

	this.updateBeat = function(sound, beatIndex) {

		let soundsAtBeatIndex = pattern[beatIndex];
		let soundInBeatIndex = soundsAtBeatIndex.find(soundInBeatIndex => soundInBeatIndex.name === sound.name);

		if(soundInBeatIndex) {
			pattern[beatIndex] = soundsAtBeatIndex.filter(existingSound => existingSound.name != sound.name);
		} else {
			pattern[beatIndex].push(sound);
		}
		return pattern;
	};

	this.clearPattern = () => {
		pattern = [[],[],[],[],[],[],[],[],[],[],[],[]];
		return pattern;
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
		angular.element(document.querySelectorAll(".sound")).removeClass('current-beat playing');
	};

	function playSound(sound) {
		source = audioContext.createBufferSource();
		source.buffer = sound.sound;
		source.connect(audioContext.destination);
		source.start(0);
	}

	const highlightCurrentlyPlayingSounds = function(rhythmIndex) {
		let soundsInLastBeat = angular.element(document.querySelectorAll(`[data-beatIndex='${(rhythmIndex + loopLength - 1) % loopLength}']`));
		let soundsInCurrentBeat = angular.element(document.querySelectorAll(`[data-beatIndex='${rhythmIndex}']`));

		soundsInCurrentBeat.addClass('current-beat');
		angular.forEach(soundsInCurrentBeat, function(sound) {
			if(angular.element(sound).hasClass('active')) {
				angular.element(sound).addClass('playing');
			}
		});
		soundsInLastBeat.removeClass('current-beat playing');
	};

	function schedule() {
		let currentTime = audioContext.currentTime;
		if(webAudioApiContext != 'webkit') {
			currentTime -= startTime;
		}
		while (noteTime < currentTime + 0.200) {
			let contextPlayTime = noteTime + startTime;
			let sounds = pattern[rhythmIndex];
			if (sounds.length > 0) {
				for(let sound of sounds) {
					playSound(sound);
				}
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
