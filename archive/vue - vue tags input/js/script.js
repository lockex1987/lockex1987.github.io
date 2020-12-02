new Vue({
    el: '#demo1',

    data() {
        return {
            tag: '',
            tags: [],
            autocompleteItems: [{
                text: 'Spain',
            }, {
                text: 'France',
            }, {
                text: 'USA',
            }, {
                text: 'Germany',
            }, {
                text: 'China',
            }],
        }
    },

    computed: {
        filteredItems() {
            let query = this.tag.toLowerCase()
            return this.autocompleteItems.filter(e => {
                return e.text.toLowerCase().indexOf(query) !== -1
            })
        },
    },
})

new Vue({
    el: '#demo2',

    data() {
        return {
            tag: '',
            tags: [],
            autocompleteItems: [],
            debounce: null,
        };
    },
    watch: {
        'tag': 'initItems',
    },
    methods: {
        update(newTags) {
            this.autocompleteItems = [];
            this.tags = newTags;
        },
        initItems() {
            if (this.tag.length < 2) return;
            const url = `https://itunes.apple.com/search?term=${this.tag}&entity=allArtist&attribute=allArtistTerm&limit=6`;

            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                axios.get(url).then(response => {
                    this.autocompleteItems = response.data.results.map(a => {
                        return { text: a.artistName };
                    });
                }).catch(() => console.warn('Oh. Something went wrong'));
            }, 600);
        },
    },
})

new Vue({
    el: '#demo3',

    data() {
        return {
            tag: '',
            tags: [],
            handlers: [],
        }
    },

    methods: {
        checkTag(obj) {
            //this.handlers.push(obj.addTag);
            this.handlers = [
                obj.addTag
            ];
            console.log(this.handlers.length);

            /*
            if (obj.tag.text.includes('e')) {
                alert('Letter "e" is forbidden');
            } else {
                obj.addTag();
            }
            */
        },

        cancel() {
            // for some reason we need nextTick here
            this.$nextTick(() => this.handlers = []);
            this.tag = '';
        },

        add() {
            // Thực hiện hành động addTag
            this.handlers.forEach(h => h());
            this.$nextTick(() => this.handlers = []);
        },
    },
})

new Vue({
    el: '#demo4',

    data() {
        return {
            tag: '',
            tags: [{
                "text": "abc",
                "tiClasses": [ "ti-valid" ]
            }, {
                "text": "def",
                "tiClasses": [ "ti-valid" ]
            }]
        }
    },
})