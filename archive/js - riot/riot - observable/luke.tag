<luke>
    <div>
        <span>{ this.hi }</span>
    </div>


    <script>
        self = this
        self.hi = 'Luke'
        riot.store.on('hello', function(greeting) {
            self.hi = greeting
            self.update()
        })
    </script>
</luke>
