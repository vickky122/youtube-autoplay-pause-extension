let activeYouTubeTabId = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  const tabId = activeInfo.tabId;
  chrome.tabs.get(tabId, tab => {
    if (tab && tab.url && tab.url.includes("youtube.com/watch")) {
      activeYouTubeTabId = tabId;
      playVideo(tabId);
    } else {
      pauseAllVideos();
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("youtube.com/watch")) {
    if (tabId === activeYouTubeTabId) {
      playVideo(tabId);
    }
  }
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // No window has focus (the user is not interacting with any application)
    pauseAllVideos();
  } else {
    chrome.windows.getAll({ populate: true }, windows => {
      windows.forEach(window => {
        window.tabs.forEach(tab => {
          if (tab.active && tab.id === activeYouTubeTabId) {
            playVideo(activeYouTubeTabId);
          } else {
            pauseAllVideos();
          }
        });
      });
    });
  }
});

function playVideo(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: () => {
      const video = document.querySelector('video');
      if (video && video.paused) {
        video.play();
      }
    }
  });
}

function pauseAllVideos() {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      if (tab.url && tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: () => {
            const video = document.querySelector('video');
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      }
    });
  });
}
