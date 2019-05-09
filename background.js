var browser = !!browser ? browser : chrome;
var contextMenus = !!browser.menus ? browser.menus : browser.contextMenus;


var downloadResults = function (results) {
    var filesToDownload = results[0];
    Object.keys(filesToDownload).forEach(function (id) {
        browser.downloads.download({
            url: filesToDownload[id].url,
            // There is a bug in Chromium causing `filename` to be ignored
            // https://bugs.chromium.org/p/chromium/issues/detail?id=579563
            filename: filesToDownload[id].filename,
            conflictAction: "overwrite",
            saveAs: true
        });
    });
};


var menuAction = function (info, tab) {
    // Chrome
    if (browser.hasOwnProperty('contextMenus')) {
        browser.tabs
            .executeScript(tab.id, { file: "chomikuj.js" }, downloadResults);
    }
    // Firefox
    else {
        browser.tabs
            .executeScript(tab.id, { file: "chomikuj.js" })
            .then(downloadResults);
    }
};


contextMenus.create({
    title: "Download selected mp3's",
    contexts: ["selection"],
    onclick: menuAction
});

contextMenus.create({
    title: "Download all mp3's on page",
    contexts: ["all"],
    onclick: menuAction
});
