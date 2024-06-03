function playVideo() {
  const video = document.querySelector('video');
  if (video) {
    video.play();
  }
}

function pauseVideo() {
  const video = document.querySelector('video');
  if (video) {
    video.pause();
  }
}
