angular.module('app').controller('drumPad', ['$scope', function($scope){
		$scope.name = "John";
		$scope.getDrum = function() {
			return require('../public/Drum1.mp3');
		};
}]);
