// var audioPath = "../../static/audio/JC Blues/Y2Mate.is - K.C. Blues by Charlie Parker-Ubmw5jvRvZU-160k-1654855740466.4.wav"
// var audioPath = "../../static/audio/JC Blues/backing1.wav"
var audio = null;
var play = false;
var keyPresses = [];
var startTime = null;
var offset = 0; // TODO manually update this information
let visualizers = []
let currentSequence = null;
var tonePlayer = null;
var tonePlayer2 = null;

const playBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop')
playBtn.addEventListener('click', () => playAudio());
stopBtn.addEventListener('click', () => stopAudio());
document.getElementById('save').addEventListener('click', () => writeCSV());

window.onload = () => {
  initPlayer();
};

function loadFile(url) {
    console.log('in loadFile')
   initPlayer();
}

async function initPlayer() {
  ind = localStorage.getItem('index');
  audioPath = localStorage.getItem('audio_' + ind);
  localStorage.setItem('index', parseInt(ind)+1);
  // Disable the UI.
  playBtn.disabled = false;
  playBtn.textContent = 'Loading';
  //currentSequence.mute = true;

//   const tempo = seq.tempos[0].qpm;
//   player.setTempo(tempo);
//   tempoValue.textContent = tempoInput.value = '' + tempo;

  playBtn.disabled = false;
  playBtn.textContent = 'Play';
  tonePlayer = await new Tone.Player(audioPath).toDestination();
  // tonePlayer.sync().start(0);
}

window.addEventListener("keydown", function(event){
    if(event.code === "KeyB") {
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


async function playAudio() {
    console.log('in playAudio', audio, play);
    Tone.Transport.start(0);
    keyPresses.push([Tone.Transport.getSecondsAtTime()]);
    tonePlayer.start();
}

async function stopAudio() {
  console.log('in stop')
    Tone.Transport.stop();
    tonePlayer.stop();
    await tonePlayer.unsync();
    // replayTaps();
}

function writeCSV() {
  let csvContent = "data:text/csv;charset=utf-8," 
  + keyPresses.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}