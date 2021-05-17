localStorage.clear()

if (localStorage.getItem('songs')) {
    songs = localStorage.getItem('songs').split(',');
} else {
    var songs = ["taverna.mp3"];
}

var context;

window.onload = function () {
    var AudioContext = window.AudioContext          // Default
        || window.webkitAudioContext;  // Safari and old versions of Chrome
    context = new AudioContext()
    var source = context.createMediaElementSource(song)
    source.connect(context.destination);


    highShelf = context.createBiquadFilter(); // подчеркивание/понижение выше заданных
    lowShelf = context.createBiquadFilter(); // подчеркивание/пониженме ниже заданных
    highPass = context.createBiquadFilter(); // пропускает высокие, ослабляет низкие
    lowPass = context.createBiquadFilter(); // пропускает низкие, ослабляет высокие

    source.connect(highShelf);
    highShelf.connect(lowShelf);
    lowShelf.connect(highPass);
    highPass.connect(lowPass);
    lowPass.connect(context.destination);

    highShelf.type = "highshelf";
    highShelf.frequency.value = 4700; // частота
    highShelf.gain.value = 50;

    lowShelf.type = "lowshelf";
    lowShelf.frequency.value = 35;
    lowShelf.gain.value = 50;

    highPass.type = "highpass";
    highPass.frequency.value = 800;
    highPass.Q.value = 0.7; // фактор качества контролирует пропускную способность и количество затронутых частот

    lowPass.type = "lowpass";
    lowPass.frequency.value = 880;
    lowPass.Q.value = 0.7;
}


var imgsFolder = "img/";
var songsFolder = "songs/";

var songTitle = document.getElementById("songTitle");

var seekBar = document.getElementById("seek-bar");
var barRect = seekBar.getBoundingClientRect();

var fillBar = document.getElementById("fill");
var handle = document.getElementById('handle')

var volumeBar = document.querySelector('.volume-bar');
var volumeBarRect = volumeBar.getBoundingClientRect();

var playBtn = document.getElementById('play');
var currentTime = document.getElementById('current-time');
var songDuration = document.getElementById('song-duration');

var inputFileBtn = document.querySelector('.add-plus');
var filesInput = document.querySelector('.add-file-input');

// var song = document.querySelector("audio")
var song = new Audio();
var currentSong = 0;
var songToPlay = songs[currentSong]
song.src = songsFolder + songToPlay;
songTitle.textContent = songToPlay;
song.volume = 0.5;
// initSong(songs[currentSong])

var highShelf
var lowShelf
var highPass
var lowPass

var ranges = document.querySelectorAll('input[type=range]');