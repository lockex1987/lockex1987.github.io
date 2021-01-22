// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// https://www.jstips.co/en/javascript/sorting-strings-with-accented-characters/


const TEST_DATA = [
    'An',
    'Doanh nghiệp',
    'điện than',
    'Da',
    'Z',
    'Hà Nội',
    'Đăk Lăk'
];


function removeVietnam(s) {
    let r = s.toLowerCase().replace(/\s+/g, '-');
    const NON_ASCIIS = {
        '-': '[`~!@#$%^&*()_|+=?;:",.<>/]',
        a: '[ảàạảãàáâãäåắặẳằẵấầẩẫậâă]',
        ae: 'æ',
        c: 'ç',
        e: '[èéẹẽẻềệếểễê]',
        d: '[đ]',
        i: '[ìíîïị]',
        n: 'ñ',
        o: '[òóôõöộồốổỗơởợỡờớôơ]',
        oe: 'œ',
        u: '[ùúûűüủụưửựứừữư]',
        y: '[ýỳỷỵỹ]'
    };
    for (const i in NON_ASCIIS) {
        r = r.replace(new RegExp(NON_ASCIIS[i], 'gi'), i);
    }
    r = r.replace(/[^\w\s]/gi, '-');
    return r;
};


const DEMO_LIST_TEMPLATE = `
    <div>
        <h3>
            {{title}}
        </h3>

        <ul>
            <li v-for="s in names">
                {{s}}
            </li>
        </ul>
    </div>`;


const DemoList = {
    template: DEMO_LIST_TEMPLATE,

    props: [
        'title',
        'names'
    ]
};


new Vue({
    el: '#app',

    components: {
        DemoList
    },

    data() {
        return {
            list: [
                {
                    title: 'Sử dụng sort bình thường',
                    names: [...TEST_DATA].sort()
                },
                {
                    title: 'Sử dụng localeCompare',
                    names: [...TEST_DATA].sort((a, b) => a.localeCompare(b))
                },
                {
                    title: 'Sử dụng localeCompare với locale',
                    names: [...TEST_DATA].sort((a, b) => a.localeCompare(b, 'vi'))
                },
                {
                    title: 'Sử dụng Intl.Collator',
                    names: [...TEST_DATA].sort(Intl.Collator().compare)
                },
                {
                    title: 'Sử dụng Intl.Collator với locale',
                    names: [...TEST_DATA].sort(Intl.Collator('vi').compare)
                }
            ]
        };
    }
});
