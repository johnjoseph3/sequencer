angular.module('app').controller('drumPad', ['$scope', 'Sequencer', ($scope, Sequencer) => {

	Sequencer.getSounds()
		.then(function(sounds){
			$scope.sounds = sounds;
			$scope.$apply();
	});

	$scope.addSoundToBeat = (sound, beatIndex) => {
		Sequencer.addSoundToBeat(sound, beatIndex);
	};

	$scope.numberOfSteps = 12;

	$scope.start = () => Sequencer.start();
	$scope.stop = () => Sequencer.stop();

}]);
