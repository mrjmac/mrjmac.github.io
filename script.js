// Heavy credit to Sameer Saini, most css and a significant amount of code is from him

const audio = document.querySelector('audio');
const playPauseBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');
const preveBtn = document.querySelector('#previous');
const songList = document.querySelector('.song-list');
const title = document.querySelector('#title');
const record = document.querySelector('.record');
const volSlider = document.querySelector('.slider');

let songArray = []
let songHeading = '';
let songIndex = 0;
let isPlaying = false;

function loadAudio() {
    audio.src = songArray[songIndex];

    let songListItems = songList.getElementsByTagName('li');
    songHeading = songListItems[songIndex].getAttribute('data-name');
    title.innerText = songHeading;

    for (i = 0; i < songListItems.length; i++)
    {
        songListItems[i].classList.remove('active');
    }

    songList.getElementsByTagName('li')[songIndex].classList.add('active');
}

function loadSongs() {
    let songs = songList.getElementsByTagName('li');
    for (i = 0; i < songs.length; i++)
    {   
        songArray.push(songs[i].getAttribute('data-scr'));
    }

    loadAudio();
    
}

loadSongs();

function playAudio() {
    audio.play();
    playPauseBtn.querySelector('i.fas').classList.remove('fa-play');
    playPauseBtn.querySelector('i.fas').classList.add('fa-pause');
    isPlaying = true;
    if (songIndex == 0 || songIndex == 5 || songIndex == 6 || songIndex == 7 || songIndex == 9)
    {
        document.getElementById("balls").src="images/donda.png"; 
    }
    else if (songIndex == 12 || songIndex == 13 || songIndex == 14)
    {
        document.getElementById("balls").src="images/Capture.PNG"; 
    }
    else
    {
        document.getElementById("balls").src="images/Kanye_West_-_Jesus_Is_King.png"; 
    }
       
}

function pauseAudio()
{
    audio.pause();
    playPauseBtn.querySelector('i.fas').classList.remove('fa-pause');
    playPauseBtn.querySelector('i.fas').classList.add('fa-play');
    isPlaying = false;
}

function nextSong() {
    songIndex++;
    if (songIndex > songArray.length - 1)
    {
        songIndex = 0;
    }
    loadAudio();
    playAudio();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0)
    {
        songIndex = songArray.length - 1;
    }
    loadAudio();
    playAudio();
}

playPauseBtn.addEventListener('click', function() {
    if(isPlaying)
    {
        pauseAudio();
    }
    else 
    {
        playAudio();
    }
}, false);

nextBtn.addEventListener('click', function() {
    nextSong();
}, false);

preveBtn.addEventListener('click', function() {
    previousSong();
}, false);

songList.addEventListener('click', function(e) {
    songIndex = e.target.closest('li').getAttribute('data-index');
    loadAudio();
    playAudio();
}, false);

audio.addEventListener('ended', function() {
    nextSong();
});

volSlider.addEventListener('input', function() {
    audio.volume = volSlider.value / 100;
}, false);