angular.module('app').controller('drumPad', ['$scope', ($scope) => {

	// FIXME Find a better more dynamic way to retrieve files.
	$scope.soundFileIndices = ["01", "02", "03", "04", "05", "06", "07", "08"];

	$scope.getSound = (soundFileIndex) => {
		return require(`../public/AB_Clap-${soundFileIndex}.wav`);
	};

}]);
