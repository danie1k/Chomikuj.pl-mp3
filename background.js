browser.menus.create({
    id: "chomik-download-selection",
    title: "Download selected mp3's",
    contexts: ["selection"]
});

browser.menus.create({
    id: "chomik-download-all",
    title: "Download all mp3's on page",
    contexts: ["all"]
});


browser.menus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "chomik-download-selection" || info.menuItemId === "chomik-download-all") {
        browser.tabs
            .executeScript(tab.id, { file: "chomikuj.js" })
            .then(function (results) {
                var filesToDownload = results[0];
                Object.keys(filesToDownload).forEach(function (id) {
                    browser.downloads.download(filesToDownload[id]);
                });
            });
    }
});
