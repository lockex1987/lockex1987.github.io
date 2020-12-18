const template = `
<div>
    <div class="text-center">
        <img src="images/tam quoc dien nghia.jpg" />
    </div>

    <current-item :item="currentItemObject"/>

    <div class="playlist">
        <div v-for="(sec, sectionIdx) in sections" class="section">
            <div class="text-white hover:bg-primary px-3 py-1 mb-3 cursor-pointer"
                    :class="[currentSectionIndex == sectionIdx ? 'bg-primary' : 'bg-info']"
                    @click="toggleSection(sectionIdx)">
                {{sec.fromNumber}} - {{sec.toNumber}}
            </div>

            <div v-show="currentSectionIndex == sectionIdx">
                <div class="p-2 d-flex hover:bg-success mb-3 cursor-pointer"
                        :class="{ 'bg-success': chapterObj.idx == currentItemIndex }"
                        v-for="chapterObj in sec.items"
                        @click="setCurrentChapter(chapterObj.idx)">
                    <div class="number"
                            :class="[chapterObj.idx == currentItemIndex ? 'text-white' : 'text-danger']"
                            style="width: 60px">
                        Hồi {{chapterObj.idx + 1}}
                    </div>
                    <div class="flex-1"
                            :class="{ 'text-white': chapterObj.idx == currentItemIndex }">
                        {{chapterObj.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;


import CurrentItem from './CurrentItem.js';

export default {
    template,

    components: {
        CurrentItem
    },

    data() {
        return {
            items: chapters,
            noOfItemsEachSection: 10,
            currentSectionIndex: -1,
            currentItemIndex: -1
        };
    },

    computed: {
        sections() {
            const numberOfSections = Math.ceil(this.items.length / this.noOfItemsEachSection);
            const arr = [];
            for (let sectionIdx = 0; sectionIdx < numberOfSections; sectionIdx++) {
                const fromNumber = sectionIdx * this.noOfItemsEachSection + 1;
                const toNumber = Math.min(fromNumber + this.noOfItemsEachSection - 1, this.items.length);
                const items = [];
                for (let itemIdx = fromNumber - 1; itemIdx < toNumber; itemIdx++) {
                    items.push(this.items[itemIdx]);
                }
                arr.push({
                    fromNumber,
                    toNumber,
                    items
                })
            }
            return arr;
        },

        currentItemObject() {
            if (this.currentItemIndex < 0 || this.currentItemIndex > this.items.length) {
                return {};
            }
            return this.items[this.currentItemIndex];
        }
    },

    mounted() {
        let oldItemIndex = localStorage.getItem('currentItemIndex');
        if (!oldItemIndex) {
            oldItemIndex = 0;
        } else {
            oldItemIndex = parseInt(oldItemIndex);
        }
        this.setCurrentChapter(oldItemIndex);

        // this.currentSectionIndex = Math.floor(oldItemIndex / this.noOfItemsEachSection);
    },

    methods: {
        toggleSection(sectionIdx) {
            if (this.currentSectionIndex != sectionIdx) {
                this.currentSectionIndex = sectionIdx;
            } else {
                this.currentSectionIndex = -1;
            }
        },

        setCurrentChapter(idx) {
            this.currentItemIndex = idx;
            localStorage.setItem('currentItemIndex', idx);
        }
    }
};
