angular.module('app').controller('drumPad', ['$scope', ($scope) => {
	const audioContext = new AudioContext();

	const getAudioBuffer = (soundFileUrl) => {
		$scope.isLoadingSongs = true;
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

	Promise.all([
		getAudioBuffer('http://localhost:8080/1.wav'),
		getAudioBuffer('http://localhost:8080/2.wav'),
		getAudioBuffer('http://localhost:8080/3.wav'),
		getAudioBuffer('http://localhost:8080/4.wav')
	])
	.then(buffers => {
		console.log(buffers);
		$scope.isLoadingSongs = false;
	});

}]);
