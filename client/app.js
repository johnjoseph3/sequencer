import angular from 'angular';
import uirouter from 'angular-ui-router';
const app = angular.module('app', [uirouter]);

require('file?name=[name].[ext]!./index.html');
require('./stylesheet.css');
require('./drum-pad.js');

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			template: require("html!./drum-pad.html"),
		});
});
