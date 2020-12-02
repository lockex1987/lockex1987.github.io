Vue.directive('linkified', function (el, binding) {
    console.log(binding.value);
    el.innerHTML = linkifyHtml(el.innerHTML, binding.value);
});

let LinkifyComponent = {
    template: '<p>{{ text }}</p>',
    props: ['text'],
    mounted() {
        //console.log(this.$el.innerHTML);
        //this.$el.innerHTML = linkifyHtml(this.$el.innerHTML);
        linkifyElement(this.$el);
    }
};

new Vue({
    el: '#app',
    data() {
        const s = '<b>Sử dụng</b> thư viện https://soapbox.github.io/linkifyjs/. <script>alert(1)</script>';
        return {
            message: s,
            other: linkifyStr(s)
        };
    },
    components: {
        LinkifyComponent
    }
});
