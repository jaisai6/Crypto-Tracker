const color = 'red';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  let signedIn = false;
  chrome.storage.sync.set({ signedIn });

});

console.log("start");