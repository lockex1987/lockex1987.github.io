const App = {
    template: `
<div class="viewer">
    <img :src='s' v-for="s in images" class="d-block h-auto mb-2 mx-auto mt-0"/>
</div>`,

    data() {
        return {
            images: IMAGES
        };
    }
};

new Vue({
    el: '#app',
    components: {
        App
    }
});

