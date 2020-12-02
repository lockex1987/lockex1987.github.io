const App = (() => {
    // Tách riêng các phần ra
    const template = `
            <div>
                <div>
                    <button class="btn btn-primary" @click="updateUsername('facebook')">
                        Facebook
                    </button>

                    <button class="btn btn-secondary ml-2" @click="updateUsername('microsoft')">
                        Microsoft
                    </button>

                    <button class="btn btn-success ml-2" @click="updateUsername('google')">
                        Google
                    </button>
                </div>
            
                <div class="mt-3">
                    <div class="font-weight-500 mb-3">
                        Repos by {{ username }}
                    </div>
                
                    <div class="bg-light" v-for="repo in repos" :key="repo.id">
                        {{ repo.name }}
                    </div>
                </div>
            </div>`;

    return {
        template,

        data() {
            return {
                repos: [],
                username: 'facebook',
                _source: null
            };
        },

        mounted() {
            this.fetchRepos();
        },

        methods: {
            async fetchRepos() {
                // Cancel the previous request
                if (this._source != null) {
                    this._source.cancel('Operation canceled due to new request.');
                }
        
                // Save the new request for cancellation
                this._source = axios.CancelToken.source();
                let cancelToken = this._source.token;
        
                try {
                    let url = `https://api.github.com/users/${this.username}/repos`;
                    let response = await axios.get(url, { cancelToken });
                    this.repos = response.data;
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error);
                    } else {
                        console.log(error);
                    }
                }
            },

            updateUsername(newUsername) {
                if (this.username != newUsername) {
                    this.username = newUsername;
                    this.fetchRepos();
                }
            }
        }
    };
})();


new Vue({
    el: '#app',
    components: {
        App
    }
});
