let play = document.getElementById('play');
let progressbar = document.getElementById('progressbar');
let audio = new Audio('audio/10.mp3');

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
})

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressbar.value = progress;
    progressbar.style.background = `linear-gradient(to right, #1aff05 ${progress}%, #333 ${progress}%)`;
})

progressbar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #1aff05 ${value}%, #333 ${value}%)`;
})