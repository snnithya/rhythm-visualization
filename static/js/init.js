// writes the audio paths to local storage

window.onload  = () => {
    define_paths()
    
}

function define_paths() {
    localStorage.clear();
    localStorage.setItem('index', '0')
   localStorage.setItem('audio_0', "../static/audio/warmup.wav")
   localStorage.setItem('audio_1', "../static/audio/warmup.wav")
   localStorage.setItem('audio_2', "../static/backing/warmup.wav")
   localStorage.setItem('audio_3', "../static/audio/test1.wav")
   localStorage.setItem('audio_4', "../static/audio/test1.wav")
   localStorage.setItem('audio_5', "../static/backing/test1.wav")
   localStorage.setItem('audio_6', "../static/audio/test2.wav")
   localStorage.setItem('midi_6', "../static/midi/test2.mid")
   localStorage.setItem('audio_7', "../static/audio/test2.wav")
   localStorage.setItem('midi_7', "../static/midi/test2.mid")
   localStorage.setItem('audio_8', "../static/backing/test2.wav")
   localStorage.setItem('audio_9', "../static/audio/test3.wav")
   localStorage.setItem('midi_9', "../static/midi/test3.mid")
   localStorage.setItem('audio_10', "../static/audio/test3.wav")
   localStorage.setItem('midi_10', "../static/midi/test3.mid")
   localStorage.setItem('audio_11', "../static/backing/test3.wav")
   localStorage.setItem('audio_12', "../static/audio/test4.wav")
   localStorage.setItem('midi_12', "../static/midi/test4.mid")
   localStorage.setItem('audio_13', "../static/audio/test4.wav")
   localStorage.setItem('midi_13', "../static/midi/test4.mid")
   localStorage.setItem('audio_14', "../static/backing/test4.wav")
   localStorage.setItem('audio_15', "../static/audio/test5.wav")
   localStorage.setItem('midi_15', "../static/midi/test5.mid")
   localStorage.setItem('audio_16', "../static/audio/test5.wav")
   localStorage.setItem('midi_16', "../static/midi/test5.mid")
   localStorage.setItem('audio_17', "../static/backing/test5.wav")
   localStorage.setItem('audio_18', "../static/audio/test6.wav")
   localStorage.setItem('midi_18', "../static/midi/test6.mid")
   localStorage.setItem('audio_19', "../static/audio/test6.wav")
   localStorage.setItem('midi_19', "../static/midi/test6.mid")
   localStorage.setItem('audio_20', "../static/backing/test6.wav")
}