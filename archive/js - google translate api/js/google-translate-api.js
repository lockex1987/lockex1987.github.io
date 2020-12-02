async function callApi(text) {
    const params = {
        client: 'dict-chrome-ex',
        sl: 'en',
        tl: 'vi',
        q: text
    };
    const url = 'https://clients5.google.com/translate_a/t?' + new URLSearchParams(params).toString();
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const data = await fetch(url, options).then(resp => resp.json());
    const output = data.sentences.map(e => e.trans);
    const translated = output.join(' ');
    console.log(translated);
    return translated;
}

callApi('Hello world. Let\'s call Google Translate API.');
