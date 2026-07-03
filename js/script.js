let play = document.getElementById('play');
let progressbar = document.getElementById('progressbar');
let audio = new Audio('audio/10.mp3');

const updateProgressUI = (value = 0) => {
    if (!progressbar) return;
    progressbar.value = value;
    progressbar.style.background = `linear-gradient(to right, #1aff05 ${value}%, #333 ${value}%)`;
};

const safeUpdateProgress = () => {
    if (!progressbar) return;

    const duration = audio.duration;
    if (!duration || !isFinite(duration) || duration === 0) {
        updateProgressUI(0);
        return;
    }

    const progress = (audio.currentTime / duration) * 100;
    updateProgressUI(progress);
};

if (play && progressbar) {
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
    });

    audio.addEventListener('timeupdate', safeUpdateProgress);
    audio.addEventListener('loadedmetadata', () => updateProgressUI(0));

    progressbar.addEventListener('input', function () {
        const duration = audio.duration;
        if (!duration || !isFinite(duration) || duration === 0) return;

        const value = this.value;
        this.style.background = `linear-gradient(to right, #1aff05 ${value}%, #333 ${value}%)`;
        audio.currentTime = (value * duration) / 100;
    });
}

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

const makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        if (play) {
            play.classList.remove('fa-circle-play');
            play.classList.add('fa-circle-pause');
        }

        const index = parseInt(e.target.id, 10);
        audio.src = `audio/${index}.mp3`;
        audio.currentTime = 0;
        updateProgressUI(0);
        audio.play();
    });
});