(function () {
    var result = {};

    var getFragment = function () {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            return selection.getRangeAt(0).cloneContents();
        }
        return document;
    };

    var extractMp3 = function (node) {
        var fileMatch = /chomikuj\.pl\/(.*?\/)+(.*?),([0-9]+)\.mp3/gi.exec(node.href);
        if (fileMatch) {
            var fileName = (fileMatch[2] + '.mp3').replace(/\*../g, '_').replace(/\+/g, ' ');
            result[fileMatch[3]] = {
                url: 'https://chomikuj.pl/Audio.ashx?id=' + fileMatch[3] + '&type=2&tp=mp3',
                filename: decodeURIComponent(fileName)
            };
        }
    };

    var linksInSelection = getFragment().querySelectorAll('a');
    linksInSelection.forEach(extractMp3);
    return result;
})();
