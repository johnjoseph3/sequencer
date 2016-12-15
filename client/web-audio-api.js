// References
// https://www.html5rocks.com/en/tutorials/webaudio/intro/
// https://www.html5rocks.com/en/tutorials/audio/scheduling/
// http://catarak.github.io/blog/2014/12/02/web-audio-timing-tutorial/
// http://patternsketch.com/



// var audioContext = null;
// var isPlaying = false;      // Are we currently playing?
// var startTime;              // The start time of the entire sequence.
// var current16thNote = 0;        // What note is currently last scheduled?
// var tempo = 120.0;          // tempo (in beats per minute)
// var lookahead = 25.0;       // How frequently to call scheduling function
// 														//(in milliseconds)
// var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
// 														// This is calculated from lookahead, and overlaps
// 														// with next interval (in case the timer is late)
// var nextNoteTime = 0.0;     // when the next note is due.
// var noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
// var noteLength = 0.05;      // length of "beep" (in seconds)
// var canvas,                 // the canvas element
//     canvasContext;          // canvasContext is the canvas' context 2D
// var last16thNoteDrawn = -1; // the last "box" we drew on the screen
// var notesInQueue = [];      // the notes that have been put into the web audio,
// 														// and may or may not have played yet. {note, time}
// var timerWorker = null;     // The Web Worker used to fire timer messages
//
// var audioContext = new AudioContext();

//
// var intervalId;


// Schedule notes

// function scheduler() {
//   // while there are notes that will need to play before the next interval,
//   // schedule them and advance the pointer.
//   while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
//     scheduleNote( current16thNote, nextNoteTime );
//     nextNote();
//   }
// }
//
// function nextNote() {
//     // Advance current note and time by a 16th note...
//     var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT
//                                           // tempo value to calculate beat length.
//     nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
//
//     current16thNote++;    // Advance the beat number, wrap to zero
//     if (current16thNote == 16) {
//         current16thNote = 0;
//     }
// }
//
// function scheduleNote( beatNumber, time ) {
// 	console.log(beatNumber, time);
//     // push the note on the queue, even if we're not playing.
//     notesInQueue.push( { note: beatNumber, time: time } );
//
//     if ( (noteResolution==1) && (beatNumber%2))
//         return; // we're not playing non-8th 16th notes
//     if ( (noteResolution==2) && (beatNumber%4))
//         return; // we're not playing non-quarter 8th notes
//
//     // create an oscillator
//     var osc = audioContext.createOscillator();
//     osc.connect( audioContext.destination );
//     if (beatNumber % 16 === 0)    // beat 0 == high pitch
//         osc.frequency.value = 880.0;
//     else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
//         osc.frequency.value = 440.0;
//     else                        // other 16th notes = low pitch
//         osc.frequency.value = 220.0;
//
//     osc.start( time );
//     osc.stop( time + noteLength );
// }
//
// let startMetronome = function() {
// 	intervalId = setInterval(scheduler, 100);
// };
//
// let stopMetronome = function() {
// 	clearInterval(intervalId);
// };
//
// export default function metronomeControls(){
// 	return {
// 		startMetronome: startMetronome,
// 		stopMetronome: stopMetronome
// 	};
// }
