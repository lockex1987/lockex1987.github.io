<leia>
    <div>
        <button onclick={ sayHi }>
            Say Hi to Luke
        </button>
    </div>


    <script>
        sayHi() {
            riot.store.trigger('hello', 'Hello, from Leia')
        }
    </script>
</leia>
