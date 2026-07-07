// ===================== ELEMENTS =====================
const $ = (id) => document.getElementById(id);

let play = $("play");
let forward = $("forward");
let backward = $("backward");
let shuffle = $("shuffle");
let repeat = $("repeat");
let progressbar = $("progressbar");
let playerTitle = $("playerTitle");
let playerArtist = $("playerArtist");
let playerArtwork = $("playerArtwork");

const resolveAssetUrl = (path) => new URL(path, window.location.href).toString();
let audio = new Audio(resolveAssetUrl("audio/10.mp3"));
let currentSong = 10;
let playMusic = [...document.getElementsByClassName("playMusic")];
let playlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

let isShuffle = false;
let isRepeat = false;
let savedState = null;

const storageKey = "musicPlayerState";

// ===================== TRACK DETAILS =====================
const trackInfo = {
    1: {
        title: "the last letter",
        artist: "maan pannu",
        image: "img/s1.png"
    },
    2: {
        title: "arz kiya hai",
        artist: "Anuv jain",
        image: "img/s2.png"
    },
    3: {
        title: "khat",
        artist: "Navjot Ahuja",
        image: "img/s3.png"
    },
    4: {
        title: "ishq",
        artist: "Faheem abdullah",
        image: "img/s4.png"
    },
    5: {
        title: "mon kamoner jonmodin",
        artist: "mekhla dasgupta",
        image: "img/s5.png"
    },
    6: {
        title: "Du Haatey Mutho Bhorey",
        artist: "Debraj Bhattacharya",
        image: "img/s6.jpg"
    },
    7: {
        title: "suroor",
        artist: "aditya rikhari",
        image: "img/s7.png"
    },
    8: {
        title: "karone okarone",
        artist: "Minar Rahman",
        image: "img/s8.jpg"
    },
    9: {
        title: "Mon bojhena",
        artist: "Arijit Singh",
        image: "img/s9.jpg"
    },
    10: {
        title: "tu hain toh main hoon",
        artist: "Arijit Singh",
        image: "img/s10.png"
    },
    11: {
        title: "Deewaana Deewaana",
        artist: "A.R. Rahman, Irshad Kamil",
        image: "img/s11.jpg"
    },
    12: {
        title: "tere ishq main",
        artist: "A.R. Rahman and Arijit Singh",
        image: "img/s12.jpg"
    },
    13: {
        title: "tujhko",
        artist: "Arijit Singh",
        image: "img/al5.jpg"
    },
    14: {
        title: "humesha",
        artist: "pritam",
        image: "img/al5.jpg"
    }
};

// ===================== UI FUNCTIONS =====================
const updateProgressUI = (value = 0) => {
    if (!progressbar) return;

    progressbar.value = value;
    progressbar.style.background =
        `linear-gradient(to right,#1aff05 ${value}%,#333 ${value}%)`;
};

const safeUpdateProgress = () => {
    if (!progressbar) return;

    const duration = audio.duration;

    if (!duration || !isFinite(duration)) {
        updateProgressUI();
        return;
    }

    updateProgressUI((audio.currentTime / duration) * 100);
};

const updatePlayerInfo = (trackId) => {
    const info = trackInfo[trackId] || trackInfo[10];

    playerTitle && (playerTitle.textContent = info.title);
    playerArtist && (playerArtist.textContent = info.artist);
    playerArtwork && (playerArtwork.src = resolveAssetUrl(info.image));
};

const setPlayButtonState = (playing) => {
    if (!play) return;

    play.classList.toggle("fa-circle-pause", playing);
    play.classList.toggle("fa-circle-play", !playing);
};

const setActiveTrackIcon = (trackId) => {
    playMusic.forEach(btn => {
        btn.classList.remove("fa-circle-play", "fa-circle-pause");
        btn.classList.add(
            +btn.id === trackId
                ? "fa-circle-pause"
                : "fa-circle-play"
        );
    });
};
// ===================== PLAYER STATE =====================
const savePlayerState = () => {
    try {
        savedState = {
            currentSong,
            currentTime: audio.currentTime || 0,
            isPlaying: !audio.paused,
            isShuffle,
            isRepeat
        };

        localStorage.setItem(storageKey, JSON.stringify(savedState));
    } catch (err) {
        console.warn("Unable to save player state", err);
    }
};

const loadPlayerState = () => {
    try {
        const state = JSON.parse(localStorage.getItem(storageKey));
        if (!state) return null;

        currentSong = state.currentSong || 10;
        isShuffle = !!state.isShuffle;
        isRepeat = !!state.isRepeat;
        savedState = state;

        updatePlayerInfo(currentSong);

        audio.src = resolveAssetUrl(`audio/${currentSong}.mp3`);
        audio.currentTime = Number(state.currentTime) || 0;

        setPlayButtonState(state.isPlaying);

        if (shuffle)
            shuffle.style.color = isShuffle ? "#1aff05" : "#fff";

        if (repeat)
            repeat.style.color = isRepeat ? "#1aff05" : "#fff";

        if (state.isPlaying)
            audio.play().catch(() => { });

        return state;

    } catch (err) {
        console.warn("Unable to load player state", err);
        return null;
    }
};

// ===================== TRACK FUNCTIONS =====================
const getTrackIds = () => playlist;

const playTrack = (trackId = currentSong) => {

    currentSong = trackId;

    updatePlayerInfo(trackId);

    audio.src = resolveAssetUrl(`audio/${trackId}.mp3`);
    audio.currentTime = 0;

    updateProgressUI();
    setPlayButtonState(true);
    setActiveTrackIcon(trackId);

    savePlayerState();

    audio.play().catch(() => { });
};

// ===================== PLAY / PAUSE =====================
if (play && progressbar) {

    play.addEventListener("click", () => {

        if (audio.paused || audio.currentTime === 0) {
            audio.play().catch(() => { });
            setPlayButtonState(true);
        } else {
            audio.pause();
            setPlayButtonState(false);
        }

        savePlayerState();
    });

    audio.addEventListener("timeupdate", () => {
        safeUpdateProgress();
        savePlayerState();
    });

    audio.addEventListener("loadedmetadata", () => {

        if (savedState)
            audio.currentTime = Number(savedState.currentTime) || 0;

        safeUpdateProgress();
    });

    progressbar.addEventListener("input", function () {

        const duration = audio.duration;

        if (!duration || !isFinite(duration)) return;

        updateProgressUI(this.value);

        audio.currentTime = (this.value * duration) / 100;

        savePlayerState();
    });
}

// ===================== SONG CLICK =====================
playMusic.forEach(song => {

    song.addEventListener("click", e => {

        const id = +e.currentTarget.id;

        if (!Number.isNaN(id))
            playTrack(id);
    });

});
// ===================== NEXT / PREVIOUS =====================
const playNextSong = () => {

    const trackIds = getTrackIds();
    if (!trackIds.length) return;

    if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * trackIds.length);
        playTrack(trackIds[randomIndex]);
        return;
    }

    const currentIndex = trackIds.indexOf(currentSong);
    const nextIndex =
        currentIndex >= 0
            ? (currentIndex + 1) % trackIds.length
            : 0;

    playTrack(trackIds[nextIndex]);
};

const playPrevSong = () => {

    const trackIds = getTrackIds();
    if (!trackIds.length) return;

    const currentIndex = trackIds.indexOf(currentSong);

    const prevIndex =
        currentIndex > 0
            ? currentIndex - 1
            : trackIds.length - 1;

    playTrack(trackIds[prevIndex]);
};

// ===================== BUTTON EVENTS =====================
forward?.addEventListener("click", playNextSong);
backward?.addEventListener("click", playPrevSong);

// ===================== SHUFFLE =====================
shuffle?.addEventListener("click", () => {

    isShuffle = !isShuffle;

    shuffle.style.color = isShuffle
        ? "#1aff05"
        : "#fff";

    savePlayerState();
});

// ===================== REPEAT =====================
repeat?.addEventListener("click", () => {

    isRepeat = !isRepeat;

    repeat.style.color = isRepeat
        ? "#1aff05"
        : "#fff";

    savePlayerState();
});

// ===================== AUDIO EVENTS =====================
audio.addEventListener("ended", () => {

    if (isRepeat)
        playTrack(currentSong);
    else
        playNextSong();

});

audio.addEventListener("play", () => {
    setPlayButtonState(true);
    savePlayerState();
});

audio.addEventListener("pause", () => {
    setPlayButtonState(false);
    savePlayerState();
});

// ===================== SAVE STATE =====================
window.addEventListener("beforeunload", savePlayerState);
window.addEventListener("pagehide", savePlayerState);

// ===================== START PLAYER =====================
const initializePlayer = () => {
    loadPlayerState();

    if (!savedState) {
        updatePlayerInfo(currentSong);
        setPlayButtonState(false);
        setActiveTrackIcon(currentSong);
        updateProgressUI(0);
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePlayer);
} else {
    initializePlayer();
}