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
    audio.currentTime = (progressbar.value * audio.duration) / 100;
})

let playMusic = Array.from(document.getElementsByClassName('playMusic'));
makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}
playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
    })
})