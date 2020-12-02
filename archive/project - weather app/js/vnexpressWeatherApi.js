var vnexpressWeatherApi = (function () {

    // Mapping giữa thành phố và ID
    var cityMapping = {
        "hanoi": "24"
    }

    function parseWeatherInfo(obj) {
        var retval = {}
        retval.date = new Date(obj.date_code.replace(/(\d{2})(\d{2})(\d{4})/, '$3-$2-$1'))
        retval.maxTemp = parseFloat(obj.max_temp)
        retval.minTemp = parseFloat(obj.min_temp)
        retval.temp = parseFloat(obj.temp)
        retval.weather = obj.weather
        retval.icon = obj.weather_code
        console.log(retval)
        return retval
    }

    function getWeatherOfCity(cityId) {
        // loc=24 là Hà Nội
        // is_full=1 để lấy ra thông tin cho cả ngày hiện tại (current)
        var url = `https://usi-saas.vnexpress.net/weather/next3days?loc=${cityId}&is_full=1`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                var current = data.data.current
                var next1 = data.next3day[0]
                var next2 = data.next3day[1]
                var next3 = data.next3day[2]

                parseWeatherInfo(current)
                parseWeatherInfo(next1)
                parseWeatherInfo(next2)
                parseWeatherInfo(next3)
            })
    }

    /**
     * Lấy thông tin thời tiết của Hà Nội.
     */
    function getHanoiWeather() {
        getWeatherOfCity(cityMapping['hanoi'])
    }

    // Các API chìa ra ngoài
    return {
        getHanoiWeather
    }
})()
