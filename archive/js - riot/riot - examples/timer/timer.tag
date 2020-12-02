<timer>
  <p>
    Seconds Elapsed:
    { time }
  </p>

  <script>
    this.time = opts.start || 0

    tick() {
      this.update({ time: ++this.time })
    }

    var timer = setInterval(this.tick, 1000)

    this.on('unmount', function() {
      clearInterval(timer)
    })
  </script>

  <style>
    timer {
      display: block;
      max-width: 300px;
      margin: 0 auto;
      border: 1px solid rgba(64, 139, 194, .5);
      border-radius: 6px;
      color: rgba(64, 139, 194, 1);
      height: 100px;
      line-height: 100px;
      text-align: center;
      background: white;
    }

    p {
      margin: 0;
    }
  </style>
</timer>
