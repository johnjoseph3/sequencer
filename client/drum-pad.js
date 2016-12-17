angular.module('app').controller('drumPad', ['$scope', 'Sequencer', ($scope, Sequencer) => {

	$scope.beat = [];

	Sequencer.getSounds()
		.then(function(sounds){
			$scope.sounds = sounds;
			$scope.$apply();
	});

	$scope.updateBeat = (sound, beatIndex) => {
		$scope.beat = Sequencer.updateBeat(sound, beatIndex);
	};

	$scope.tempo = Sequencer.getTempo();

	$scope.$watch('tempo', function (tempo) {
		Sequencer.updateTempo(tempo);
	}, true);

	$scope.numberOfSteps = 12;

	$scope.start = () => Sequencer.start();
	$scope.stop = () => Sequencer.stop();

}]);
