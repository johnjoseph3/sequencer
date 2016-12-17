angular.module('app').controller('drumPad', ['$scope', 'Sequencer', ($scope, Sequencer) => {

	$scope.beat = [];

	Sequencer.getSounds()
		.then(function(sounds){
			$scope.sounds = sounds;
			$scope.$apply();
	});

	$scope.beatIsPlaying = false;

	$scope.updateBeat = (sound, beatIndex) => {
		$scope.beat = Sequencer.updateBeat(sound, beatIndex);
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

}]);
