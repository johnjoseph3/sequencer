import metronomeControls from "./web-audio-api.js";
let metronomeControlFunction = metronomeControls();
angular.module('app').controller('drumPad', ['$scope', ($scope) => {
	$scope.bpm = 120;
	let soundIndices = ["01", "02", "03", "04", "05", "06", "07", "08"];
	// FIXME Find a more dynamic way to retrieve files.
	$scope.sounds = [];

	for(let soundIndex of soundIndices) {
		$scope.sounds.push(require(`../public/AB_Clap-${soundIndex}.wav`));
	}

	$scope.playMetronome = function(){metronomeControlFunction.startMetronome();};

	$scope.stopMetronome = function(){metronomeControlFunction.stopMetronome();};

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
					let beat = $scope.beat[currentSoundindex];
					if(beat !== null) {
						new Audio(beat).play();
					}
					currentSoundindex++;
				}	else {
					let beat = $scope.beat[currentSoundindex];
					currentSoundindex = 0;
					if(beat !== null) {
						new Audio(beat).play();
					}
					currentSoundindex++;
				}
			} else {
				clearInterval(interval);
			}
		}, bpmInMilliseconds);

	};

}]);
