const characters = [
    {
        id: 'ryu',
        name: 'Ryu',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/ryu_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/ryu_compressed.png',
        height: '5"9',
        birth: 'jp',
        fighting: 'Ansatsuken',
        skills: 'Sleeping anywhere',
        alignment: 'Good',
        alignmentType: 'good',
        active: true,
    },
    {
        id: 'ken',
        name: 'Ken',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/ken_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/ken-compressed.png',
        height: '5"9',
        birth: 'us',
        fighting: 'Ansatsuken',
        skills: 'Cooking pasta',
        alignment: 'Good',
        alignmentType: 'good',
        active: false,
    },
    {
        id: 'chun_li',
        name: 'Chun-Li',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/chun_li_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/chun_li-compressed.png',
        height: '5"6',
        birth: 'cn',
        fighting: 'Chinese martial arts',
        skills: 'Shooting',
        alignment: 'Lawful Good',
        alignmentType: 'good',
        active: false,
    },
    {
        id: 'dee_jay',
        name: 'Dee Jay',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/dj_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/dj-compressed.png',
        height: '6"1',
        birth: 'jm',
        fighting: 'Kickboxing',
        skills: 'Bamboo dancing',
        alignment: 'Good',
        alignmentType: 'good',
        active: false,
    },
    {
        id: 'cammy',
        name: 'Cammy',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/cammy_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/cammie-compressor.png',
        height: '5"5',
        birth: 'gb',
        fighting: 'Shadaloo/Special Forces Training',
        skills: 'Knife throwing',
        alignment: 'Good/Lawful Neutral',
        alignmentType: 'good',
        active: false,
    },
    {
        id: 'sagat',
        name: 'Sagat',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/sagat_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/sagat-compressed.png',
        height: '7"5',
        birth: 'th',
        fighting: 'Muay Thai',
        skills: 'Breathing underwater',
        alignment: 'Neutral',
        alignmentType: 'neutral',
        active: false,
    },
    {
        id: 'zangief',
        name: 'Zangief',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/zangief_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/zangief-compressed.png',
        height: '7"0',
        birth: 'ru',
        fighting: 'Russian/American Pro Wrestling',
        skills: 'Resistance to cold',
        alignment: 'Evil',
        alignmentType: 'evil',
        active: false,
    },
    {
        id: 'akuma',
        name: 'Akuma',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/akuma_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/akuma_compressed.jpg',
        height: '5"10',
        birth: 'jp',
        fighting: 'Satsui no Hado/Ansatsuken',
        skills: 'Martial Arts',
        alignment: 'Neutral Evil',
        alignmentType: 'evil',
        active: false,
    },
    {
        id: 'bison',
        name: 'Bison',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/bison_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/bison-compressor.png',
        height: '6"0',
        birth: undefined,
        fighting: 'Psycho Power',
        skills: 'Hypnosis',
        alignment: 'Evil',
        alignmentType: 'evil',
        active: false,
    },
    {
        id: 'blanka',
        name: 'Blanka',
        smallImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/blanka_headshot_compressed.jpg',
        largeImg: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/blanka_compressed.png',
        height: '6"4',
        birth: 'br',
        fighting: 'Feral movement, electric attacks',
        skills: 'Hunting',
        alignment: 'Good',
        alignmentType: 'good',
        active: false,
    },
]

Vue.component('character-component', {
    template: `
            <div class="character-box"
                    :class="[{ 'active': character.active }]"
                    @click="setActive(character.id)">
                <img class="character-img" :src="character.smallImg" />
                <p class="character-name">
                    {{ character.name }}
                </p>
            </div>`,
    props: {
        character: Object
    },
    methods: {
        setActive() {
            characters.map((character) => {
                character.active = this.character.id === character.id;
            });
        }
    }
})

new Vue({
    el: '#app',
    data: {
        activeCharacter: {},
        characters
    },

    computed: {
        getActiveCharacter() {
            return this.filterCharacters();
        },

        getCharacterAlignment() {
            const activeCharacter = this.filterCharacters();
            return activeCharacter.alignmentType;
        }
    },

    methods: {
        filterCharacters() {
            return this.characters.find(character => {
                return character.active;
            });
        }
    }
});
