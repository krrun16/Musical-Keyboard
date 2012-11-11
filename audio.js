// The making of this couldn't have been done without these sources:
// http://www.html5rocks.com/en/tutorials/webaudio/intro/
// http://www.javascriptkit.com/javatutors/javascriptkey.shtml

var context;
var bufferLoader;
var characterMap = {};
var musicOn = true;
window.onload = init;

function init() {
  try {
    context = new webkitAudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
  // Uses the audio context to load notes (helpers/notes.js) and runs finishedLoading
  bufferLoader = new BufferLoader(context, notes, finishedLoading);
  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Combining key presses with decoded audio files into a map
  for (var i = 0; i < characters.length; i++) {
    characterMap[characters[i]] = bufferList[i%bufferList.length];
  }
  // When a key is pressed, play music!
  document.onkeypress = playMusic
}

function playMusic() {
  // Setting up musical attributes
  var startTime = context.currentTime + 0.100;
  var tempo = 200; // BPM (beats per minute)
  var eighthNoteTime = (60 / tempo) / 2;
  
  var actualkey=convertToString();
  if (actualkey in characterMap)
    playSound(characterMap[actualkey], startTime + 1 * eighthNoteTime);
}

// Play the specified sound
function playSound(buffer, time) {
  if (musicOn) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.noteOn(time);
  }
}

function toggleMusic() {
  musicOn = !musicOn;
}

// Converts onkeypress event to the character being pressed
function convertToString() {
  var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
  var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
  if (unicode == 13) return '\n'
  else return String.fromCharCode(unicode)
}
