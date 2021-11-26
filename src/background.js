chrome.action.onClicked.addListener(async tab => {
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { toggleVisible: true });
    }
});

async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case "POPUP_INIT":
            getCurrentTab().then(sendResponse);
            return true;
        default:
            break;
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "generate-password",
        title: "Create password",
        contexts: ["editable"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { data: info });
    }
});
