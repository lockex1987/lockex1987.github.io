new Vue({
    el: '#app',

    data() {
        return {
            items: [
                { path: 'cover.html', title: 'Cover' },
                { path: 'toc.html', title: 'Nội dung' },
                { path: 'introduction.html', title: 'Giới thiệu' },
                { path: 'author.html', title: 'Tác giả' },
                { path: 'https://lockex1987.github.io/archive/deno%20-%20get%20started/', title: 'Học Deno' },
                { path: 'https://lockex1987.github.io/archive/deno%20-%20installation/', title: 'Cài đặt' },
                { path: 'https://lockex1987.github.io/archive/deno%20-%20aqua%20web%20framework/', title: 'Aqua web framework' },
                { path: '', title: 'Deploy' },
            ],
            currentItemIndex: 0,
            frameLoaded: false
        };
    },

    computed: {
        currentItemObject() {
            return this.items[this.currentItemIndex];
        }
    },

    mounted() {
        this.$refs.contentFrame.addEventListener('load', (evt) => {
            this.frameLoaded = true;
        });
    },

    methods: {
        gotoPreviousItem() {
            if (this.currentItemIndex > 0) {
                this.gotoItem(this.currentItemIndex - 1);
            }
        },

        gotoNextItem() {
            if (this.currentItemIndex < this.items.length - 1) {
                this.gotoItem(this.currentItemIndex + 1);
            }
        },

        gotoItem(idx) {
            this.frameLoaded = false;
            this.currentItemIndex = idx;
        }
    }
});
