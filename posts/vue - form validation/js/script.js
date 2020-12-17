const app = new Vue({
    el: '#app',

    data: {
        errors: [],
        name: null,
        email: null,
        age: null,
        movie: null,
        weapons: 0,
        shields: 0,
        coffee: 0,
        ac: 0,
        mousedroids: 0
    },

    computed: {
        total: function () {
            // must parse because Vue turns empty value to string
            return Number(this.weapons) +
                Number(this.shields) +
                Number(this.coffee) +
                Number(this.ac) +
                Number(this.mousedroids);
        }
    },

    methods: {
        checkForm: function (evt) {
            /*
            if (this.name && this.age) {
                return true;
            }
            */

            this.errors = [];

            if (!this.name) {
                this.errors.push('Name required.');
            }

            if (!this.email) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email required.');
            }

            if (!this.age) {
                this.errors.push('Age required.');
            }

            if (this.total != 100) {
                this.errors.push('Total must be 100!');
            }

            if (!this.errors.length) {
                return true;
            }

            evt.preventDefault();
        },

        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
});
