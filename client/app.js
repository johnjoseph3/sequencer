require("./style.css");

const app = angular.module('app',[]);

app.controller('mainController', ['$scope', function($scope) {
	$scope.greeting = 'Hola!';
}]);
