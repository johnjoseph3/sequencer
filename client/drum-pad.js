import {sounds} from "./load-tracks.js";

angular.module('app').controller('drumPad', ['$scope', function($scope){
		$scope.soundNumbers = ["01", "02", "03", "04", "05", "06", "07", "08"];

		$scope.getSound = function(soundNumber) {
			return require(`../public/AB_Clap-${soundNumber}.wav`);
		};

}]);
