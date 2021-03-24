// AJAX?
let data; // = DATA;

const versions = [];
let chapters;
let currentVersion;


/*
http://lienhoanhoa.net/online/THTT/000.jpg
http://lienhoanhoa.net/online/THTT/26/000.jpg

http://lienhoanhoa.net/online/THTT/26/01/000.jpg
http://lienhoanhoa.net/online/THTT/26/01/000a.jpg
http://lienhoanhoa.net/online/THTT/26/01/000b.jpg

http://lienhoanhoa.net/online/THTT/26/01/001.jpg
http://lienhoanhoa.net/online/THTT/26/01/108.jpg

http://lienhoanhoa.net/online/THTT/26/01/End.jpg
*/


function startVue(dataParam) {
    new Vue({
        el: '#app',

        data() {
            return {
                // Dữ liệu
                stories: dataParam,
                // Truyện, bộ, tập hiện tại
                currentStory: {},
                currentVersion: {},
                currentChapter: {},
                // Danh sách ảnh
                images: [],
                // Màn hình (home, version, chapter)
                screen: 'home'
            };
        },

        methods: {
            viewVersion(storyIdx, versionIdx) {
                this.currentStory = this.stories[storyIdx];
                this.currentVersion = this.currentStory.versions[versionIdx];
                this.screen = 'version';
            },

            viewChapter(chapterIdx) {
                this.currentChapter = this.currentVersion.chapters[chapterIdx];
                this.images = this.getImages();
                this.screen = 'chapter';
            },

            getImages() {
                const prefix = `http://ebook.lienhoanhoa.net/online/${this.currentStory.folder}/${this.currentVersion.folder}/${this.currentChapter.folder}/`;
                const images = [
                    prefix + '000.jpg',
                    prefix + '000a.jpg',
                    prefix + '000b.jpg'
                ];
                for (let i = 1; i <= this.currentChapter.pages; i++) {
                    images.push(prefix + ('' + i).padStart(3, '0') + '.jpg');
                }
                images.push(prefix + 'End.jpg');
                return images;
            }
        }
    });
}


async function init() {
    data = await fetch('data/data_php_new.json').then(resp => resp.json());
    startVue(data);
}


init();
