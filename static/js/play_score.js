var audioPath = null;
var midiURL = null;
var audio = null;
var play = false;
var timer = 210;
var tonePlayer = null;
var intId = null;
var duration = 13;
var origTempo = 0;
var origTempos = [];
var tempo = 1;
var currentSequence = null;
firstPlay = true;


const playBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop')
const svg = document.getElementById('svgBox');

playBtn.onclick = () => {
    playAudio();    // TODO - make audioPath a variable
}

stopBtn.onclick = () => {
    stopAudio();
}

document.getElementById("tempo").oninput = () => {
    stop();
    updateTempo();
}

document.getElementById("next").onclick = () => {
  stop();
}

window.onload = () => {
    initParent();
}

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
  currentSequence.tempos.forEach(elem => {
    origTempo = origTempo + (elem['qpm'])
    origTempos.push(elem['qpm'])
  });
  origTempo = origTempo/currentSequence.tempos.length
  console.log(origTempo)
  // Enable the UI.
  await player.loadSamples(seq);
  playBtn.disabled = false;
  playBtn.textContent = 'Play';
  
    tonePlayer = await new Tone.Player(audioPath).toDestination();
    // duration = visualizers[0].noteSequence.totalTime;
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

function updateTempo() {
    tempo = document.getElementById('tempo').value
    console.log(tempo)
    document.getElementById('tempoVal').innerHTML = tempo;
    stopAudio();
    // audio.playbackRate = document.getElementById('tempo').value;
    // for (let i = 0; i < currentSequence.tempos.length; i++){
    //     // currentSequence.tempos[i] = tempo * origTempos[i];
    //     visualizers[0].noteSequence.tempos[i]['qpm'] = tempo * origTempos;
    // }
    // visualizers = [
    //   new mm.PianoRollSVGVisualizer(currentSequence, document.getElementById('svgBox'))
    // ];
    // player.loadSamples(currentSequence);
    player.setTempo(origTempo * tempo);
    tonePlayer.playbackRate = tempo;
    visualizers[0].noteSequence.totalTime = duration / tempo;
}

function initPath() {
   
}
// function playAudio() {
//     console.log('in playAudio', audio, play);
//     if(!audio) {
//         audio = new Audio(audioPath, loop=true);  
//         audio.loop = true;
//         setInterval(
//             function() {
//                 document.getElementById("time").innerHTML = --timer;
//                 if (timer == 0) {
//                     window.location.href = "../../templates/exp1_tapping.html"
//                 }
//             }
//             , 1000
//         );
//     }
    
//     if(play) {
//         audio.pause();
//         document.getElementById("start").innerHTML = "Play";
//     }
//     else {
//         audio.play();
//         document.getElementById("start").innerHTML = "Pause";
//     }
//     play = !play;
// }



// var audioPath = "../static/audio/JC Blues/Y2Mate.is - K.C. Blues by Charlie Parker-Ubmw5jvRvZU-160k-1654855740466.4.wav"
// var audio = null;
// var play = false;
// var keyPresses = [];
// var startTime = null;
// var offset = 0; // TODO manually update this information
// const MIDI_URL = '../static/midi/test-midi.mid';
// let visualizers = []
// let currentSequence = null;
// var tonePlayer = null;
// var tonePlayer2 = null;

// const playBtn = document.getElementById('start');
// const stopBtn = document.getElementById('stop')
// const svg = document.getElementById('svgBox');
// playBtn.addEventListener('click', () => playAudio());
// stopBtn.addEventListener('click', () => stopAudio());

// window.onload = () => {
//     initParent();
// };

async function playLowLevel() {
    console.log('in play');
    // Tone.Transport.start();
    if(play){
        // if (Tone.Transport.state == "started") {
        //     Tone.Transport.stop();
        // }
        document.getElementById('staff').lastChild.scrollLeft = 0;
        player.setTempo(origTempo * tempo);
        tonePlayer.start();
        player.start(currentSequence);
        // Tone.Transport.stop(8);
    }
    else {
        clearInterval(intId)
    }
}

function playAudio() {
    if(firstPlay) {
        firstPlay = false;
        setInterval(
            function() {
                document.getElementById("time").innerHTML = --timer;
                if (timer == 0) {
                    window.location.href = document.getElementById('next').getAttribute("href");
                }
            }
            , 1000
        );
    }
    play = true;
    console.log('in playAudio', audio, play);
    player.start(currentSequence);
    tonePlayer.start();
    
    intId = setInterval(() => {
        playLowLevel();
    }, duration * 1000 / parseFloat(tempo)+ 200)
    
}

async function stopAudio() {
  console.log('in stop')
  play = false;
  tonePlayer.stop();
  Tone.Transport.stop();
  player.stop();
  clearInterval(intId);
    // replayTaps();
}