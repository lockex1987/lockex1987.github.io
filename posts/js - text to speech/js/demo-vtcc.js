const DemoVtcc = {
    template: `
<div>
    <div class="mb-3">
        <audio ref="ttsPlayer" controls></audio>
    </div>
    <div class="mb-3">
        <button class="btn btn-primary" @click="speakIt()">
            Đọc
        </button>
    </div>
</div>`,

    data() {
        return {
            token: 'rZY5--al56OoXV6QAV2r5BXKdz2m7YD677bPCgsdvxDMyHAk5zp-UEBe3X9OK7ZQ'
        };
    },

    methods: {
        async speakIt() {
            const text = document.querySelector('#demoText').value.trim();

            const url = 'https://vtcc.ai/voice/api/tts/v1/rest/syn';
            const body = JSON.stringify({
                text: text,
                voice: 'doanngocle',
                id: 3,
                without_filter: false,
                speed: 1,
                tts_return_option: 2,
                timeout: 60000
            });

            const blob = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    token: this.token
                },
                body: body,
                method: 'POST'
            }).then(resp => resp.blob());

            const downloadUrl = URL.createObjectURL(blob);
            this.$refs.ttsPlayer.src = downloadUrl;
            this.$refs.ttsPlayer.play();
        }
    }
};

new Vue({
    el: '#demoVtcc',
    ...DemoVtcc
});
