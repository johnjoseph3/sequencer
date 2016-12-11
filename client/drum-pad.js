angular.module('app').controller('drumPad', ['$scope', ($scope) => {
	$scope.bpm = 120;
	// FIXME Find a more dynamic way to retrieve files.
	$scope.sounds = [];
	let soundIndices = ["01", "02", "03", "04", "05", "06", "07", "08"];
	for(let soundIndex of soundIndices) {
		$scope.sounds.push(require(`../public/AB_Clap-${soundIndex}.wav`));
	}

	$scope.beat = [];

	$scope.isBeatPlaying = false;

	$scope.addSoundToBeat = (sound, beatIndex) =>
		$scope.beat[beatIndex] = sound;

	$scope.startBeat = () => {
		console.log($scope.beat);
		$scope.isBeatPlaying = true;
		let bpmInMilliseconds = 60000/parseInt($scope.bpm);
		let currentSoundindex = 0;
		let interval = setInterval(function() {
			if($scope.isBeatPlaying) {
				if(currentSoundindex < $scope.beat.length){
					new Audio($scope.beat[currentSoundindex]).play();
					currentSoundindex++;
				}	else {
					currentSoundindex = 0;
					new Audio($scope.beat[currentSoundindex]).play();
					currentSoundindex++;
				}
			} else {
				clearInterval(interval);
			}
		}, bpmInMilliseconds);

	};

}]);
