document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const trackTitle = document.getElementById("track-title");
  const minimizeBtn = document.getElementById("minimize-btn");
  const player = document.getElementById("music-player");
  const queueDiv = document.getElementById("music-queue");

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
    renderQueue();
  }

  function renderQueue() {
    if (!queueDiv) return;
    if (player.classList.contains("collapsed")) {
      queueDiv.style.display = "none";
      return;
    }
    let html = '<ul style="list-style:none;padding:0;margin:8px 0 0 0;max-height:120px;overflow-y:auto;font-size:0.95em;">';
    playlist.forEach((track, i) => {
      if (i === currentTrack) {
        html += `<li style='color:#ff80ab;font-weight:bold;'>▶ ${track.title}</li>`;
      } else {
        html += `<li style='color:#6b6bff;'>${track.title}</li>`;
      }
    });
    html += '</ul>';
    queueDiv.innerHTML = html;
    queueDiv.style.display = "block";
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
    renderQueue();
  });

  loadTrack(currentTrack);
  renderQueue();
  // Keyboard accessibility: space/enter for controls
  [playPauseBtn, prevBtn, nextBtn, minimizeBtn].forEach(btn => {
    btn.addEventListener('keyup', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        btn.click();
      }
    });
  });
});
