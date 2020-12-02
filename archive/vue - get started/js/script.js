var app = new Vue({
    el: '#app-1',
    data: {
        message: 'Do you wanna build a Vue app?'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        myTitle: 'Bạn đã ở trang web này vào ' + new Date().toLocaleString()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

function toggleApp3() {
    app3.seen = !app3.seen;
}

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Học JavaScript' },
            { text: 'Học Vue' },
            { text: 'Xây dựng cái gì đó hay ho' }
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'qua lại khách chờ sông lặng sóng'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split(' ').reverse().join(' ');
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hãy sửa thông điệp này'
    }
});

Vue.component('todo-item', {
    props: [
        'todo'
    ],
    template: '<li>{{ todo.text }}</li>'
});

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 1, text: 'Cà pháo' },
            { id: 2, text: 'Mắm tôm' },
            { id: 3, text: 'Thịt chó' }
        ]
    }
});