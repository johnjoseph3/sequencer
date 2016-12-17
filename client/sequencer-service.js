angular.module('app').service('Sequencer', function() {

	this.audioContext = new AudioContext();

	this.getAudioBuffer = (soundFileUrl) => {
		let audioContext = this.audioContext;
		let promise = new Promise((resolve, reject) => {
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
	};

});
