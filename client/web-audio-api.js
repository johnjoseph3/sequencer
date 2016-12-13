// References
// https://www.html5rocks.com/en/tutorials/webaudio/intro/
// https://www.html5rocks.com/en/tutorials/audio/scheduling/
// http://catarak.github.io/blog/2014/12/02/web-audio-timing-tutorial/
// http://patternsketch.com/


context = new AudioContext()

var soundFileUrls = [
	'http://localhost:3000/1.wav',
	'http://localhost:3000/2.wav',
	'http://localhost:3000/3.wav',
	'http://localhost:3000/4.wav',
	];

buffers = [];

onError = function(){
	console.log("Error retrieving sound.");
}

var playBeatButton = document.getElementById('play-beat');
playBeatButton.addEventListener("click", function(){
	playSounds()
});

soundFileUrls.forEach(function(soundFileUrl){
	var request = new XMLHttpRequest();
	request.open('get', soundFileUrl, true);
	request.responseType = 'arraybuffer'
	request.onload = function(){
		context.decodeAudioData(request.response, function(buffer){
			buffers.push(buffer);
		}, onError)
	}
	request.send();
})

playSounds = function(){
	// var startTime = context.currentTime + 0.200;
	var tempo = 120; // BPM (beats per minute)
	var eighthNoteTime = (60 / tempo) / 2;

	for (var bar = 0; bar < 4; bar++) {
		var time = context.currentTime + bar * 8 * eighthNoteTime;
		// Play the bass (kick) drum on beats 1, 5
		playSound(buffers[0], time);
		playSound(buffers[0], time + 4 * eighthNoteTime);

		// Play the snare drum on beats 3, 7
		playSound(buffers[2], time + 2 * eighthNoteTime);
		playSound(buffers[2], time + 6 * eighthNoteTime);

		// Play the hi-hat every eighth note.
		for (var i = 0; i < 8; ++i) {
			playSound(buffers[3], time + i * eighthNoteTime);
		}
	}
}

function playSound(buffer, time) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(time);
}
