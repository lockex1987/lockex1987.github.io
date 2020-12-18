const DemoNative = {
    template: `
<div>
    <div class="mb-3">
        <select v-model="selectedVoice" class="custom-select">
            <option v-for="v in voices" :value="v.lang">
                {{v.name}} ({{v.lang}})
            </option>
        </select>
    </div>

    <div class="mb-3">
        <button class="btn btn-primary" @click="speakIt()">
            Đọc
        </button>
    </div>
</div>`,

    data() {
        return {
            voices: [],
            selectedVoice: ''
        };
    },

    mounted() {
        this.getVoiceList();

        // Phải thêm cả cái này nữa, nếu không lúc bắt đầu nó không ăn
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.getVoiceList;
        }
    },

    methods: {
        getVoiceList() {
            if (typeof speechSynthesis === 'undefined') {
                return;
            }
        
            this.voices = speechSynthesis.getVoices();
            this.selectedVoice = (this.voices && this.voices.length) ? this.voices[0].lang : '';
        },

        speakIt() {
            const text = document.querySelector('#demoText').value.trim();
            const voice = this.voices.find(e => e.lang == this.selectedVoice);
            if (voice) {
                const utter = new SpeechSynthesisUtterance();
                utter.lang = this.selectedVoice;
                utter.pitch = 1;
                utter.rate = 1;
                /*
                utter.volume = options.volume;
                utter.onstart = onEvent.bind(null, {type: 'start', charIndex: 0});
                utter.onerror =
                utter.onend = onEvent.bind(null, {type: 'end', charIndex: text.length});
                */
                utter.text = text;
                utter.voice = voice;
                speechSynthesis.speak(utter);
            }
        }
    }
};

new Vue({
    el: '#demoNative',
    ...DemoNative
});
