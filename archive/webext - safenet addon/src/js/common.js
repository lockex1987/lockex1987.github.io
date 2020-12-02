var Common = (function() {

    /**
     * Chuyển một text nhiều dòng thành một mảng String.
     * @param keywords Text chứa nhiều dòng
     */
    function normalizeWordList(keywords) {
        var a = keywords.split(/,|\n/);
        var wordList = [];
        for (var i = 0; i < a.length; i++) {
            a[i] = a[i].trim();
            if (a[i]) {
                wordList.push(a[i]);
            }
        }
        //console.log(wordList);
        return wordList;
    }

    return {
        normalizeWordList: normalizeWordList
    };
})();
