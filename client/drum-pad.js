angular.module('app').controller('drumPad', ['$scope', 'Sequencer', ($scope, Sequencer) => {

	// const getSounds = () => {
	// 	console.log("Loading sounds");
	// 	$scope.isLoadingSounds = true;
	// 	Promise.all([
	// 		Sequencer.getAudioBuffer('http://localhost:8080/1.wav'),
	// 		Sequencer.getAudioBuffer('http://localhost:8080/2.wav'),
	// 		Sequencer.getAudioBuffer('http://localhost:8080/3.wav'),
	// 		Sequencer.getAudioBuffer('http://localhost:8080/4.wav')
	// 	])
	// 	.then(buffers => {
	// 		$scope.sounds = buffers;
	// 		$scope.isLoadingSounds = false;
	// 		console.log("Sounds loaded");
	// 	});
	// };
	//
	// getSounds();

	$scope.start = () => Sequencer.start();
	$scope.stop = () => Sequencer.stop();

}]);
