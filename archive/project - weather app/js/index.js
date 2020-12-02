// https://viblo.asia/p/xay-dung-ung-dung-thoi-tiet-don-gian-voi-vuejs-Qbq5QvJEKD8
// view-source:http://thienduongweb.com/tool/weather/?r=1&w=1&g=1&d=0
// https://codepen.io/joshbader/pen/EjXgqr

var app = new Vue({
  el: '#app',
  data: {
    // Chỉ số của thành phố đang được chọn
    cityIndex: 0,
    // Danh sách chọn thành phố
    cities: [
      { value: 353412, name: "Hà Nội", image: "images/hanoi.jpg" },
      { value: 352954, name: "Đà Nẵng", image: "images/danang.jpg" },
      { value: 353981, name: "TP Hồ Chí Minh", image: "images/tphcm.jpg" }
    ],
    // Thông tin thời tiết của ngày hôm nay
    todayWeatherInfo: {},
    // Thông tin thời tiết của các ngày (ngày hôm nay và các ngày tiếp)
    days: []
  },

  computed: {
    /**
     * Đối tượng thành phố hiện tại được chọn.
     */
    currentCity() {
      return this.cities[this.cityIndex]
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    /**
     * Chọn thành phố.
     * @param {Integer} index Chỉ mục của thành phố được chọn
     */
    changeCity(index) {
      this.cityIndex = index
      this.fetchData()
    },

    /**
     * Lấy dữ liệu.
     */
    fetchData() {
      var self = this
      accuWeatherApi.getWeatherOfCity(self.cities[self.cityIndex].value, function(data) {
        self.days = data
        self.todayWeatherInfo = self.days[0]
      })
    },
  }
})
