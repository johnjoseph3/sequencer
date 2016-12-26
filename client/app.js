// References
// http://catarak.github.io/blog/2014/12/02/web-audio-timing-tutorial/
// http://patternsketch.com/

import uirouter from 'angular-ui-router';
angular.module('app', [uirouter]);

require('./stylesheet.less');
require('./routes.js');
require('./sequencer-service.js');
require('./drum-pad.js');
