angular.module('app').config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			template: require('html!./drum-pad.html'),
		});
});
