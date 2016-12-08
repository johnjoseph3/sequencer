require('file?name=[name].[ext]!./index.html');
require("./stylesheet.css");

import angular from 'angular';
import uirouter from 'angular-ui-router';

let app = angular.module('app', [uirouter]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			template: require("html!./test.html")
		});

});
