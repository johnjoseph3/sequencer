import uirouter from 'angular-ui-router';
angular.module('app', [uirouter]);

require('file?name=[name].[ext]!./index.html');
require('./stylesheet.css');
require('./routes.js');
require('./drum-pad.js');
require('./web-audio-api.js');
