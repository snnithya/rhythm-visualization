var audioPath = null;
var midiURL = null;
var audio = null;
var play = false;
var timer = 90;
var tonePlayer = null;
var intId = null;
var duration = 10;
var keyPresses = [];
var tempo = 1;
var currentSequence = null;
firstPlay = true;


const playBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop')
const svg = document.getElementById('svgBox');
document.getElementById('save').addEventListener('click', () => writeCSV());

playBtn.onclick = () => {
    playAudio();    // TODO - make audioPath a variable
}

stopBtn.onclick = () => {
    stopAudio();
}

window.onload = () => {
    initParent();
}

window.addEventListener("keydown", function(event){
    if(event.code === "KeyB" || event.code === "KeyV") {
        console.log(Tone.Transport.getSecondsAtTime())
        keyPresses.push([Tone.Transport.getSecondsAtTime()])
    }
}
);

const player = new mm.SoundFontPlayer(
'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus',
mm.Player.tone.Master, null, null, {
  run: (note) => {
    for (let i = 0; i < visualizers.length; i++) {
      visualizers[i].redraw(note, true);
    }
  },
  stop: () => {
    for (let i = 0; i < visualizers.length; i++) {
      visualizers[i].clearActiveNotes();
    }
  }
});

function loadFile(url) {
    console.log('in loadFile')
  mm.urlToNoteSequence(url)
      .then((seq) => initPlayerAndVisualizer(seq));
}

async function initPlayerAndVisualizer(seq) {
  // Disable the UI.
  playBtn.disabled = false;
  playBtn.textContent = 'Loading';
    console.log(document.getElementById('svgBox'))
  visualizers = [
    new mm.StaffSVGVisualizer(seq, document.getElementById('staff'))
  ];
  currentSequence = seq;
  currentSequence.mute = true;
  // Enable the UI.
  await player.loadSamples(seq);
  playBtn.disabled = false;
  playBtn.textContent = 'Play';
  
    tonePlayer = await new Tone.Player(audioPath).toDestination();
    duration = visualizers[0].noteSequence.totalTime;
    player.output.mute = true;

    // tonePlayer.sync().start(0);
  
}

function initParent() {
    console.log('In init parent');
    ind = localStorage.getItem('index');
    audioPath = localStorage.getItem('audio_' + ind);
    midiURL = localStorage.getItem('midi_' + ind);
    console.log(audioPath, midiURL);
    localStorage.setItem('index', parseInt(ind)+1);
    loadFile(midiURL);
}

function playAudio() {
    play = true;
    console.log('in playAudio', audio, play);
    Tone.Transport.start(0);
    keyPresses.push([Tone.Transport.getSecondsAtTime()]);
    tonePlayer.start();
    player.start(currentSequence);
    
}

async function stopAudio() {
  console.log('in stop')
  play = false;
  Tone.Transport.stop();
    player.stop();
}

function writeCSV() {
  let csvContent = "data:text/csv;charset=utf-8," 
  + keyPresses.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}