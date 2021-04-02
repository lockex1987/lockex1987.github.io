import HtmlEditor from './HtmlEditor.js';

new Vue({
    el: '#app',

    components: {
        HtmlEditor
    },

    data() {
        return {
            content: ''
        };
    },

    methods: {
        /**
         * Thiết lập mã HTML.
         */
        setCode() {
            const code = '<p>hello world</p>';
            this.content = code;
        },

        /**
         * Lấy mã HTML.
         */
        getCode() {
            const code = this.content;
            alert(code);
        },

        /**
         * Thiết lập mã HTML.
         */
        setCodeByReference() {
            const code = '<p>hello world</p>';
            this.$refs.editor.setCode(code);
            this.content = code;
        },

        /**
         * Lấy mã HTML.
         */
        getCodeByReference() {
            const code = this.$refs.editor.getCode();
            alert(code);
        }
    }
});
