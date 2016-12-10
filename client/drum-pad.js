angular.module('app').controller('drumPad', ['$scope', ($scope) => {
	$scope.bpm = 120;
	// FIXME Find a more dynamic way to retrieve files.
	$scope.soundFiles = [];
	let soundFileIndices = ["01", "02", "03", "04", "05", "06", "07", "08"];
	for(let soundFileIndex of soundFileIndices) {
		$scope.soundFiles.push(require(`../public/AB_Clap-${soundFileIndex}.wav`));
	}

	// $scope.beat = [];

	$scope.startBeat = () => {
		let bpmInMilliseconds = 60000/parseInt($scope.bpm);
		let currentBeatIndex = 0;

		setInterval(function() {
			if(currentBeatIndex < soundFiles.length){
				new Audio(soundFiles[currentBeatIndex]).play();
				currentBeatIndex++;
			}	else {
				currentBeatIndex = 0;
				new Audio(soundFiles[currentBeatIndex]).play();
				currentBeatIndex++;
			}
		}, bpmInMilliseconds);
	};

}]);
