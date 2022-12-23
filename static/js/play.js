var audioPath = null;
var audio = null;
var play = false;
var timer = 90;

document.getElementById("start").onclick = () => {
    playAudio();    // TODO - make audioPath a variable
}

document.getElementById("stop").onclick = () => {
    stop();
}

document.getElementById("tempo").oninput = () => {
    stop();
    updateTempo();
}

document.getElementById("next").onclick = () => {
    stop();
}

window.onload = () => {
    initPath();
}

function updateTempo() {
    console.log(document.getElementById('tempo').value)
    document.getElementById('tempoVal').innerHTML = document.getElementById('tempo').value;
    audio.playbackRate = document.getElementById('tempo').value;
}

function initPath() {
    ind = localStorage.getItem('index');
    audioPath = localStorage.getItem('audio_' + ind);
    console.log(audioPath)
    localStorage.setItem('index', parseInt(ind)+1);
}
function playAudio() {
    console.log('in playAudio', audio, play);
    if(!audio) {
        audio = new Audio(audioPath, loop=true);  
        audio.loop = true;
        setInterval(
            function() {
                document.getElementById("time").innerHTML = --timer;
                if (timer == 0) {
                    window.location.href = document.getElementById("next").href;
                }
            }
            , 1000
        );
    }
    
    if(play) {
        audio.pause();
        document.getElementById("start").innerHTML = "Play";
    }
    else {
        audio.play();
        document.getElementById("start").innerHTML = "Pause";
    }
    play = !play;
}

function stop() {
    if(audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    
    if(play) {
        document.getElementById("start").innerHTML = "Play";
        play = false;
    }
}