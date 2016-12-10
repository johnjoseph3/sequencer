let bpm = 150;
let bpmInMilliseconds = 60000/bpm;

let timeElapsedInMilliseconds = 0;
let timeTotalInMilliseconds = 60000;

let updateTimeMeter = function() {
	if(timeElapsedInMilliseconds < timeTotalInMilliseconds) {
		timeElapsedInMilliseconds += 10;
		if (timeElapsedInMilliseconds%bpmInMilliseconds === 0) {
			console.log("BEAT");
		}
		let timeIndicatorWidth = `${(timeElapsedInMilliseconds/timeTotalInMilliseconds)*100}%`;
		let timeIndicator = angular.element(document.querySelector('.time-indicator'));
		timeIndicator.css('width', timeIndicatorWidth);

		// Temp
		let seconds = angular.element(document.querySelector('.seconds'));
		timeIndicator.text(timeElapsedInMilliseconds);
	}
};

// CONTROLLER
angular.module('app').controller('drumPad', ['$scope', ($scope) => {

	// FIXME Find a better more dynamic way to retrieve files.
	$scope.soundFileIndices = ["01", "02", "03", "04", "05", "06", "07", "08"];

	$scope.getSound = (soundFileIndex) => {
		return require(`../public/AB_Clap-${soundFileIndex}.wav`);
	};

	$scope.startBeat = () =>
		setInterval(updateTimeMeter, 10);

}]);

// check to see if user defined bpm
// let bpm = 80;
// milliseconds = bpm/60000;
