var clickedItems = {};
console.log('hey there');
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (tabInfo.url && tabInfo.url.includes("watir.com")) {
    chrome.tabs.sendMessage(tabId, {
      type: "NEW"
    });
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.id === 'content') {
    let tabId = sender.tab.id, items;
    if (clickedItems[tabId]) {
      items = clickedItems[tabId]
    } else {
      items = [];
      clickedItems[tabId] = items;
    }
    items.push(message.data);
    console.log(clickedItems);
  } else if(message.id === 'popup' && message.type === 'fetch') {
      let tabId = message.data;
      sendResponse(clickedItems[tabId]);
  } else {
    let deleted = message.data;
    let tabId = message.tab;
    clickedItems[tabId] = clickedItems[tabId].filter(item => item !== deleted);
    sendResponse(clickedItems[tabId]);
  }
});
