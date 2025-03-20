//This Script Fetches songs with relative paths and displays them in a playlist

//Function to Get Folders
async function loadFolders() {
  let r = await fetch("./media/media.json"); // Load folders list from JSON
  let data = await r.json();
  return data.folders.map((folder) => folder.name); // Return only folder names
}

// Function to Get Full Names Array
async function getNames(folder) {
  let r = await fetch("./media/media.json"); // Load JSON
  let data = await r.json();
  
  let folderData = data.folders.find(f => f.name === folder);
  return folderData ? folderData.songs : [];
}

let songNameParagraph = document.querySelector(".song-name");
let artistNameParagraph = document.querySelector(".artist-name");

//Function to populate Songs
async function loadSongs(folder) {

  console.log('Folder:',folder);

  let Fullnames = await getNames(folder);

  console.log("1.Full Names:", Fullnames);

  let songLists = document.querySelector(".songs-list");
  songLists.innerHTML = "";

  for (const fullName of Fullnames) {
    let divSong = document.createElement("div");
    divSong.classList.add("song");
    // divSong.classList.add("visible");

    //To get song name and artist name from full string
    let songName = fullName.replaceAll("%20", " ").split(" - ")[0].trim();
    let artistName = fullName
      .replaceAll("%20", " ")
      .split(" - ")[1]
      .trim()
      .slice(0, -4);

    console.log("Song",songName,"AR",artistName);

    divSong.innerHTML = `<img class="song-svg" src="./svg/song.svg" alt="" />
            <p>${songName}</p>
            <img class="play-overlay" src="./svg/play.svg" alt="" />`;

    divSong.addEventListener("click", () => {
      playSong(folder, fullName);
      playButton.src = "./svg/pause.svg";

      // console.log(songName, artistName);

      //Song Name and Artist name Update
      songNameParagraph.innerHTML = songName;
      artistNameParagraph.innerHTML = artistName;

      //To automatically Close side tab after selecting song
      var displayValue = window.getComputedStyle(menuButton).display;
      if (!(displayValue == "none")) {
        crossButton.click();
      }
    });

    songLists.appendChild(divSong);

    setTimeout(function () {
      divSong.classList.add("visible");
    }, 10);
  }

  //setting first song of playlist automatically
  audio.src = `./media/${folder}/${Fullnames[0]}`;

  console.log("Audio.src:",audio.src);

  //setting full names to global
  SongFullNames = new Array(...Fullnames);
}

//Function to populate Playlists
async function loadPlaylists(folders) {
  let playlists = document.querySelector(".playlists");

  for (const folder of folders) {
    let r = await fetch(`./media/${folder}/info.json`);
    let j = await r.json();
    let playlistName = j.name;
    // console.log(playlistName);

    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.innerHTML = `<div class="card-image">
              <img src="./media/${folder}/cover.jpeg" alt="playlist image" />
              <img class="play-round" src="./svg/playround.svg" alt="round play button">
            </div>
            <div class="card-text">
              <p>${playlistName}</p>
            </div>`;

    divCard.addEventListener("click", async () => {
      await loadSongs(`${folder}`);

      audioBar.value = 0;

      //To automatically open side tab after selecting playlist
      var displayValue = window.getComputedStyle(menuButton).display;
      if (!(displayValue == "none")) {
        menuButton.click();
      }

      //Song Name, Artist name and Image Update
      let smallPlaylistImage = document.querySelector(".smallPlaylistImage");
      smallPlaylistImage.src = `./media/${folder}/cover.jpeg`;

      let fullNames = await getNames(folder);
      // console.log(fullNames[0]);

      let songName = fullNames[0].replaceAll("%20", " ").split(" - ")[0].trim();
      let artistName = fullNames[0]
        .replaceAll("%20", " ")
        .split(" - ")[1]
        .trim()
        .slice(0, -4);

      songNameParagraph.innerHTML = songName;
      artistNameParagraph.innerHTML = artistName;

      // To not autoplay
      playButton.src = "./svg/play2.svg";

      // To autoplay
      // audio.play();
      // playButton.src = "svg/pause.svg";
    });

    playlists.appendChild(divCard);
  }
}

// audio object
let audio = new Audio();
audio.volume = 0.9;

let audioBar = document.querySelector(".audio-bar");

//Audio bar Control according to current time & populating current time in p
audio.addEventListener("timeupdate", () => {
  let currentTimediv = document.querySelector(".currentTime");
  // console.log(`Current Time: ${formatTime(audio.currentTime)}`)
  currentTimediv.innerHTML = `${formatTime(audio.currentTime)}`;

  let percentage = ((audio.currentTime / audio.duration) * 100).toFixed(0);
  // console.log(percentage);
  // console.log(audio.currentTime);

  if (!isNaN(percentage)) {
    audioBar.value = percentage;
  }
});

//Audio current time Control from bar
audioBar.addEventListener("input", () => {
  let currentTime = (audioBar.value / 100) * audio.duration;
  audio.currentTime = currentTime;
});

//Function to get minutes:seconds format from audio object return
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad the seconds with leading zero if necessary
  const paddedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  const paddedminutes = minutes < 10 ? "0" + minutes : minutes;

  return `${paddedminutes}:${paddedSeconds}`;
}

//Function to Play Audio File
function playSong(folder, song) {
  let path = `./media/${folder}/${song}`;
  // console.log(path);

  audio.src = path;
  audio.play();
}

//Hamburger Button
let menuButton = document.querySelector(".menu-svg");
menuButton.addEventListener("click", () => {
  let left = document.querySelector(".left");
  left.style.left = "0%";
  // console.log((left.style.left = "0%"));
});

//Cross Button
let crossButton = document.querySelector(".cross-svg");
crossButton.addEventListener("click", () => {
  let left = document.querySelector(".left");
  left.style.left = "-100%";
  // console.log((left.style.left = "-100%"));
});

// Load the audio data
audio.addEventListener("loadedmetadata", () => {
  let totalTimediv = document.querySelector(".totalTime");
  totalTimediv.innerHTML = `${formatTime(audio.duration)}`;
});

// Player Buttons & Volume range
let SongFullNames = [];
let previousButton = document.querySelector(".previous-svg");
let nextButton = document.querySelector(".next-svg");
let playButton = document.querySelector(".play-svg");
let speakerButton = document.querySelector(".speaker-svg");
let volumeRange = document.querySelector(".volume-range");

//Previous Button
previousButton.addEventListener("click", () => {
  let song = audio.src.split("/")[audio.src.split("/").length - 1];
  let folder = audio.src.split("/")[audio.src.split("/").length - 2];

  // console.log(SongFullNames, song);
  if (SongFullNames.length > 0) {
    if (SongFullNames.includes(song)) {
      let index = SongFullNames.indexOf(song);
      // console.log(index)
      if (index >= 1) {
        let path = `./media/${folder}/${SongFullNames[index - 1]}`;
        // console.log(path);

        let songName = SongFullNames[index - 1]
          .replaceAll("%20", " ")
          .split(" - ")[0]
          .trim();
        let artistName = SongFullNames[index - 1]
          .replaceAll("%20", " ")
          .split(" - ")[1]
          .trim()
          .slice(0, -4);

        songNameParagraph.innerHTML = songName;
        artistNameParagraph.innerHTML = artistName;

        audio.src = path;
        audio.play();
      }
    }
  }
});

//Next Button
nextButton.addEventListener("click", () => {
  let song = audio.src.split("/")[audio.src.split("/").length - 1];
  let folder = audio.src.split("/")[audio.src.split("/").length - 2];

  // console.log(SongFullNames, song);
  if (SongFullNames.length > 0) {
    if (SongFullNames.includes(song)) {
      let index = SongFullNames.indexOf(song);
      // console.log(index)
      if (index < SongFullNames.length - 1) {
        let path = `./media/${folder}/${SongFullNames[index + 1]}`;
        // console.log(path);

        let songName = SongFullNames[index + 1]
          .replaceAll("%20", " ")
          .split(" - ")[0]
          .trim();
        let artistName = SongFullNames[index + 1]
          .replaceAll("%20", " ")
          .split(" - ")[1]
          .trim()
          .slice(0, -4);

        songNameParagraph.innerHTML = songName;
        artistNameParagraph.innerHTML = artistName;

        audio.src = path;
        audio.play();
      }
    }
  }
});

//Play Button
playButton.addEventListener("click", () => {
  if (!audio.src == "") {
    if (!audio.paused) {
      audio.pause();
      playButton.src = "./svg/play2.svg";
    } else {
      audio.play();
      playButton.src = "./svg/pause.svg";
    }
  }
});

//Speaker Range
volumeRange.addEventListener("input", () => {
  // console.log(volumeRange.value / 100)
  audio.volume = volumeRange.value / 100;
  // volume = volumeRange.value / 100;

  if (volumeRange.value > 0) {
    speakerButton.src = "./svg/speaker.svg";
  } else {
    speakerButton.src = "./svg/mute.svg";
  }
});

let volume = 0.9;

//Speaker Button
speakerButton.addEventListener("click", () => {
  if (volumeRange.value > 0) {
    volume = volumeRange.value / 100;
    speakerButton.src = "./svg/mute.svg";
    volumeRange.value = 0;
    audio.volume = 0;
  } else {
    speakerButton.src = "./svg/speaker.svg";
    volumeRange.value = volume * 100;
    audio.volume = volume;
  }
});


async function main() {
  let folders = await loadFolders();
  console.log(folders);
  await loadPlaylists(folders);
}

main();