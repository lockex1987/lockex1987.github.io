const DemoArea = {
    template: `
        <div :class="font.code">
            <h1>{{font.name}}</h1>

            <h2>This is a Header 2</h2>
            <h2>Tổng hợp tiếng nói Nhận dạng tiếng nói Voice wake-up tài liệu</h2>
            <h3>This is a Header 3</h3>
            <h4>This is a Header 4</h4>
            <h5>This is a Header 5</h5>
            <h6>This is a Header 6</h6>

            <p>This is paragraph with a <strong>bold word</strong> and some <em>italics</em></p>

            <ul>
                <li>item1</li>
                <li>item2</li>
                <li>item3</li>
                <li>item4</li>
                <li>item5</li>
            </ul>

            <hr />
        </div>`,

    props: [
        'font'
    ]
};


new Vue({
    el: '#app',

    components: {
        DemoArea
    },

    data() {
        return {
            fonts: [
                { name: 'Roboto Condensed', code: 'roboto-condensed' },
                { name: 'Roboto', code: 'roboto' },
                { name: 'Font stack', code: 'stack' },
                { name: 'Averta', code: 'averta' },
                { name: 'Open Sans', code: 'opensans' },
                { name: 'Proxima Nova', code: 'proxima-nova' },
				{ name: 'Thư pháp', code: 'thuphap' }
            ]
        };
    }
});
