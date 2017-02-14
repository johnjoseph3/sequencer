angular.module('app').controller('drumPad', ['$scope', 'Sequencer', ($scope, Sequencer) => {

	const instrumentNames = [
		'Kick',
		'Snare',
		'Closed Hat',
		'Open Hat',
		'Toms',
		'Percussion',
		'Sample/Fx',
		'Sythensizer'
	];

	Sequencer.getSounds()
		.then(function(sounds){
			$scope.sounds = [];
			sounds.forEach(function(sound, index){
				$scope.sounds.push({sound: sound, instrumentName: instrumentNames[index]});
			});
			$scope.$apply();
	});

	$scope.beatIsPlaying = false;

	$scope.isSoundInBeat = (sound, beat) => {
		let soundInBeat = beat.find(soundInBeatIndex => soundInBeatIndex === sound);
		if(soundInBeat) {
			return true;
		}
	};

	$scope.pattern = Sequencer.getPattern();

	$scope.updateBeat = (sound, beatIndex) => {
		$scope.pattern = Sequencer.updateBeat(sound, beatIndex);
	};

	$scope.tempo = Sequencer.getTempo();

	$scope.$watch('tempo', function (tempo) {
		Sequencer.updateTempo(tempo);
	}, true);

	$scope.numberOfSteps = 12;

	$scope.startOrStopBeat = () => {
		if($scope.beatIsPlaying) {
			Sequencer.stop();
		} else {
			Sequencer.start();
		}
		$scope.beatIsPlaying = !$scope.beatIsPlaying;
	};

	$scope.clearPattern = () => {
		$scope.pattern = Sequencer.clearPattern();
	};

}]);
