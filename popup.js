document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('play').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length > 0 && tabs[0].url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: playVideo
        });
      }
    });
  });

  document.getElementById('pause').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length > 0 && tabs[0].url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: pauseVideo
        });
      }
    });
  });

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
});
