new Vue({
    el: '#app',

    data: {
        screen: 'login',
        token: '',
        user: {}
    },

    components: {
        LoginForm,
        MainPage
    },

    methods: {
        gotoScreen(screen) {
            this.screen = screen;
        },

        getLoginInfo({ token, user }) {
            this.token = token;
            this.user = user;

            this.gotoScreen('main');

            this.$refs.mainPage.bindOldCookies(user.extra_info);
        }
    }
});
