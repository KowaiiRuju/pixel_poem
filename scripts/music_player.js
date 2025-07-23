document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const trackTitle = document.getElementById("track-title");
  const minimizeBtn = document.getElementById("minimize-btn");
  const player = document.getElementById("music-player");

  // Playlist (add all your mp3 files here)
  const playlist = [
    { title: "Adie - Tahanan", src: "playlist/Adie - Tahanan (Official Audio).mp3" },
    { title: "Austin Mahone - All I Ever Need", src: "playlist/Austin Mahone - All I Ever Need.mp3" },
    { title: "Ben&Ben - Saranggola", src: "playlist/Ben&Ben - Saranggola.mp3" },
    { title: "Dito Sa'kin - Earl Agustin", src: "playlist/Dito Sa'kin - Earl Agustin.mp3" },
    { title: "Jeremih - Love Don't Change", src: "playlist/Jeremih - Love Don't Change.mp3" },
    { title: "NSYNC - This I Promise You", src: "playlist/NSYNC - This I Promise You.mp3" },
    { title: "Rex Orange County - Best Friend", src: "playlist/Rex Orange County - Best Friend.mp3" },
    { title: "Ride Home", src: "playlist/Ride Home.mp3" },
    { title: "TJ Monterde - Ikaw at Ako", src: "playlist/TJ Monterde - Ikaw at Ako.mp3" },
    { title: "Purrple Cat - Sonder", src: "Sonder(chosic.com).mp3" }
  ];

  let currentTrack = 0;

  function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    trackTitle.textContent = `Now Playing: ${track.title}`;
    audio.load();
    // For accessibility: update document title
    document.title = `Now Playing: ${track.title}`;
  }

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "⏸";
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
    }
    playPauseBtn.blur();
  });

  prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseBtn.textContent = "⏸";
    prevBtn.blur();
  });

  nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseBtn.textContent = "⏸";
    nextBtn.blur();
  });

  audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
  });

  minimizeBtn.addEventListener("click", () => {
    player.classList.toggle("collapsed");
    minimizeBtn.blur();
  });

  loadTrack(currentTrack);
  // Keyboard accessibility: space/enter for controls
  [playPauseBtn, prevBtn, nextBtn, minimizeBtn].forEach(btn => {
    btn.addEventListener('keyup', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        btn.click();
      }
    });
  });
});
