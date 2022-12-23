var audioPath = "../static/audio/JC Blues/Y2Mate.is - K.C. Blues by Charlie Parker-Ubmw5jvRvZU-160k-1654855740466.4.wav"
var audio = null;
var play = false;
var keyPresses = [];
var startTime = null;
var offset = 0; // TODO manually update this information
const MIDI_URL = '../static/midi/test-midi.mid';
let visualizers = []
let currentSequence = null;
var tonePlayer = null;
var tonePlayer2 = null;

const playBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop')
const svg = document.getElementById('svgBox');
playBtn.addEventListener('click', () => playAudio());
stopBtn.addEventListener('click', () => stopAudio());

window.onload = () => {
    initParent();
};

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
    new mm.PianoRollSVGVisualizer(seq, document.getElementById('svgBox')),
    new mm.StaffSVGVisualizer(seq, document.getElementById('staff')),
    new mm.WaterfallSVGVisualizer(
        seq, document.getElementById('waterfall'), {showOnlyOctavesUsed: true}),
    // new mm.PianoRollCanvasVisualizer(seq, canvas),
  ];
  currentSequence = seq;
  //currentSequence.mute = true;

//   const tempo = seq.tempos[0].qpm;
//   player.setTempo(tempo);
//   tempoValue.textContent = tempoInput.value = '' + tempo;

  // Enable the UI.
  await player.loadSamples(seq);
  playBtn.disabled = false;
  playBtn.textContent = 'Play';
  
    tonePlayer = await new Tone.Player(audioPath).toDestination();
    player.output.mute = true;
    // tonePlayer2 = await new Tone.Player(player).toDestination();
//tonePlayer2.sync().start(0);
  tonePlayer.sync().start(0);
}

function initParent() {
    console.log('In init parent');
    loadFile(MIDI_URL);
}

function startOrStop() {
  if (player.isPlaying()) {
    player.stop();
    playBtn.textContent = 'Play';
  } else {
    player.start(currentSequence);
    playBtn.textContent = 'Stop';
  }
}

window.addEventListener("keydown", function(event){
    if(event.code === "Space") {
        console.log(Tone.Transport.getSecondsAtTime())
        // keyPresses.push({
        //     "time": Tone.Transport.getSecondsAtTime(),
        //     "note": "A3"
        // })
        keyPresses.push([Tone.Transport.getSecondsAtTime()])
    }
    // this.localStorage.setItem("keys", keyPresses);
}
);

function replayTaps() {
    const synth = new Tone.Synth().toDestination();
    // use an array of objects as long as the object has a "time" attribute
    const part = new Tone.Part(((time, value) => {
        // the value is an object which contains both the note and the velocity
        console.log(time, value)
        synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }), keyPresses).start(0);
    Tone.Transport.start();
}
// document.getElementById("start").onclick = () => {
//     playAudio();    // TODO - make audioPath a variable
//                     // TODO add count in to track
// }

function evaluate() {
    // todo - implement
}

async function playAudio() {
    console.log('in playAudio', audio, play);
    Tone.Transport.start(0);
    tonePlayer.start();
    player.start(currentSequence);
    // if(!audio) {
    //     startTime = new Date();
    //     audio = new Audio(audioPath);  
    //     audio.play();
    // }
}

async function stopAudio() {
  console.log('in stop')
    Tone.Transport.stop();
    await tonePlayer.unsync();
    writeCSV();
    // replayTaps();
}

function writeCSV() {
  let csvContent = "data:text/csv;charset=utf-8," 
  + keyPresses.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}