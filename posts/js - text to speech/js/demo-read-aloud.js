const DemoReadAloud = {
    template: `
<div>
    <p>Đọc cả trang:</p>
    <div class="mb-3">
        <button class="btn btn-primary ra-play" @click="startReadPage()">
            Đọc
        </button>

        <button class="btn btn-secondary ra-pause" @click="pauseReadPage()">
            Dừng
        </button>
    </div>

    <p>
        Đọc một đoạn:
    </p>
    <div class="mb-3">
        <button class="btn btn-primary" @click="speakIt()">
            Đọc
        </button>
    </div>
</div>`,

    data() {
        return {
            options: {
                lang: 'vi',
                pitch: 1,
                rate: 1
            }
        };
    },

    methods: {
        startReadPage() {
            readAloud.play(this.options);
        },

        pauseReadPage() {
            readAloud.pause();
        },

        speakIt() {
            const text = document.querySelector('#demoText').value.trim();
            readAloud.speak([text], this.options);
        }
    }
};

new Vue({
    el: '#demoReadAloud',
    ...DemoReadAloud
});
