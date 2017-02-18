import {availableSounds} from './sounds.js';

angular.module('app').controller('drumPad', ['$scope', 'Sequencer', ($scope, Sequencer) => {
	const instruments = [
		'kick',
		'snare',
		'closedHat',
		'openHat',
		'toms',
		'percussion',
		'sampleFx',
		'synth'
	];

	$scope.selectedSounds = [];

	// FIXME Pull sound into a class

	Sequencer.getSounds()
		.then(function(sounds){
			$scope.sounds = [];
			sounds.forEach(function(sound, index){
				let soundMetaData = availableSounds[instruments[index]];
				$scope.selectedSounds[index] = soundMetaData.sounds[0];
				$scope.sounds.push({
					sound: sound,
					name: soundMetaData.name,
					humanReadableName: soundMetaData.humanReadableName,
					alternateSounds: soundMetaData.sounds
				});
			});
			$scope.$apply();
	});

	$scope.changeSound = (sound, index, soundIndex) => {
		Sequencer.getSound(sound, $scope.selectedSounds[index])
			.then(function(sound) {
				let soundMetaData = availableSounds[instruments[index]];
				$scope.sounds[soundIndex] = {
					sound: sound,
					name: soundMetaData.name,
					humanReadableName: soundMetaData.humanReadableName,
					alternateSounds: soundMetaData.sounds
				};
			});
	};

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

	$scope.playSound = (sound) => {
		Sequencer.playSound(sound.sound);
	};

}]);
