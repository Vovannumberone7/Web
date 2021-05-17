init();

/**
 * After launch
 */
function init() {
    seekBar.addEventListener('click', (event) => {
        song.currentTime = (event.clientX - barRect.left) * song.duration / barRect.width;
        drawBar();
    });

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    volumeBar.addEventListener('click', handleChangeVolumeClick);
    inputFileBtn.addEventListener('change', handleChooseFile);

    if (localStorage.getItem('currentSong')) {
        currentSong = localStorage.getItem('currentSong');
    }

    // initSong(songs[currentSong]);
    // if (localStorage.getItem('currentTime')) {
    //     song.currentTime = localStorage.getItem('currentTime');
        drawBar();
    // }
    // if (localStorage.getItem('volume')) {
    //     song.volume = localStorage.getItem('volume');
        drawVolumeBar();
    // }
    setInterval(() => localStorage.setItem('currentTime', song.currentTime), 5000);
    song.addEventListener('timeupdate', drawBar);

}

/**
 * Set current song
 * @param songToPlay song from array
 */
function initSong(songToPlay) {
    song.src = songsFolder + songToPlay;
    songTitle.textContent = songToPlay;
    song.volume = 0.5;
}

/**
 * Set song and play it
 * @param songToPlay
 */
function prepareSong(songToPlay) {
    initSong(songToPlay);
    song.play();
}

/**
 * Play or pause song
 */
function playOrPauseSong() {
    // this.context.resume().then(() => {
        if (song.paused) {
            song.play();
            playBtn.src = imgsFolder + 'Pause.png';
        } else {
            song.pause();
            playBtn.src = imgsFolder + 'Play.png';
        }
    // })
}

/**
 * Handle "next song" button pressed
 */
function next() {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    changeSong(currentSong);
}

/**
 * Handle "prev song" button pressed
 */
function previous() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    changeSong(currentSong);
}

/**
 * Choose new song
 * @param currentSong
 */
function changeSong(currentSong) {
    prepareSong(songs[currentSong]);
    playBtn.src = imgsFolder + 'Pause.png';
    localStorage.setItem('currentSong', currentSong);
    localStorage.setItem('currentTime', 0);
}

/**
 * Draw time bar
 */
function drawBar() {
    const position = song.currentTime / song.duration;

    fillBar.style.width = position * 100 + '%';
    handle.style.marginLeft = song.currentTime * barRect.width / song.duration;

    currentTime.innerHTML = toClockView(song.currentTime);
    songDuration.innerHTML = isNaN(song.duration) ? '00:00' : toClockView(song.duration);

    if (position >= 1) {
        playBtn.src = imgsFolder + 'Play.png';
    }
}

/**
 * Miliseconds to min:sec string
 * @param currentTime song.currentTime
 * @return {string}
 */
function toClockView(currentTime) {
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime) - minutes * 60;
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes + ":" + seconds;
}

/**
 * Handle left and right arrows down
 * @param event keydown
 */
function handleKeydown(event) {
    switch (event.code) {
        case 'ArrowLeft':
            song.currentTime = song.currentTime >= 5 ? song.currentTime - 5 : 0;
            break;
        case 'ArrowRight':
            song.currentTime = song.duration - 5 >= song.currentTime ? song.currentTime + 5 : song.duration;
            break;
    }
}

/**
 * Handle space button up
 * @param event keydown
 */
function handleKeyup(event) {
    switch (event.code) {
        case 'Space':
            playOrPauseSong();
            break;
    }
}

/**
 * Handle click on volume rect
 * @param event mouseclick on volume rect
 */
function handleChangeVolumeClick(event) {
    song.volume = (volumeBarRect.bottom - event.clientY) / volumeBarRect.height;
    drawVolumeBar(song.volume);
    // localStorage.setItem('volume', song.volume);
    console.log(song.volume)
}

/**
 * Draw volume bar
 */
function drawVolumeBar() {
    const lowPercent = Math.floor(song.volume * 100) + '%';
    volumeBar.style.background = 'linear-gradient(to top, royalblue ' + lowPercent +
        ', rgb(195, 204, 231) ' + lowPercent + ')';
}

/**
 * Handle "add song" button pressed
 */
function handleChooseFile() {
    console.log(filesInput.files);
    const files = filesInput.files;
    if (files.length === 0) {
        alert("File not chosen!");
        return;
    }
    if (files[0].type !== 'audio/mpeg') {
        alert("File has a wrong extension!");
        return;
    }

    const name = files[0].name;
    if (songs.includes(name)) {
        alert("The song \"" + name + "\" is already added");
        return;
    }
    songs.push(name);
    localStorage.setItem('songs', songs);
}


ranges.forEach(function (range) {
    range.addEventListener('input', function () {
        window[this.dataset.filter][this.dataset.param].value = this.value;
    });
});