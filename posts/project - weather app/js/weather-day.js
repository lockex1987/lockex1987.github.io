Vue.component('weather-day', {
  props: ['day', 'mode'],
  computed: {
    wicon() {
      return (this.mode == 'day') ? this.day.iconDay : this.day.iconNight
    },
    wtemp() {
      return (this.mode == 'day') ? this.day.maxTemp : this.day.minTemp
    },
    tooltip() {
      return (this.mode == 'day') ? this.day.weatherDay : this.day.weatherNight
    }
  },
  template: `
    <div class="wday">
      <div class="weekday">{{ day.weekday }}</div>
      <div class="wicon">
        <img :src="wicon" :title="tooltip" />
      </div>
      <div class="wtemp">{{ wtemp }} &#176;C</div>
    </div>
  `,
})