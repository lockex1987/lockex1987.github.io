var vm = new Vue({
    el: "#people",
    data: {
        people: [
            { name: "Bill Gates", category: "Tech" },
            { name: "Steve Jobs", category: "Tech" },
            { name: "Jeff Bezos", category: "Tech" },
            { name: "George Clooney", category: "Entertainment" },
            { name: "Meryl Streep", category: "Entertainment" },
            { name: "Amy Poehler", category: "Entertainment" },
            { name: "Lady of Lórien", category: "Fictional" },
            { name: "BB8", category: "Fictional" },
            { name: "Michael Scott", category: "Fictional" }
        ],
        query: ''
    },

    computed: {
        filteredPeople: function () {
            var currentQuery = this.query.toLowerCase();
            return this.people.filter(function (person) {
                return person.name.toLowerCase().includes(currentQuery);
            });
        }
    }
});
