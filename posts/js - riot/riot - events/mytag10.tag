<mytag10>
    <h1>The Title</h1>

    <form ref="theform">
        <button ref="thebutton">Click</button>

        <input type="submit" value="Submit" />
    </form>


<script>
this.on("mount", function() {
    this.refs.thebutton.onclick = function(e) {
        console.log("Button clicked");
        return false;
    };

    this.refs.theform.onsubmit = function(e) {
        console.log("Form submitted");
        return false;
    };
});
</script>
</mytag10>