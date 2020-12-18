var accuWeatherApi = (function () {

    /**
     * Trích xuất thông tin thành các thông tin hữu ích (các trường đã thống nhất)
     * @param {Object} obj Thông tin do accuweather trả về
     */
    function parseWeatherInfo(obj) {
        var retval = {}
        retval.date = new Date(obj.Date)
        let weekdays = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
        retval.weekday = weekdays[retval.date.getDay()]
        //retval.temp
        retval.minTemp = convertFahrenheitToCelsius(obj.Temperature.Minimum.Value)
        retval.maxTemp = convertFahrenheitToCelsius(obj.Temperature.Maximum.Value)
        //retval.weather
        retval.weatherDay = obj.Day.IconPhrase
        retval.weatherNight = obj.Night.IconPhrase
        //retval.icon
        retval.iconNight = getIconNight(obj)
        retval.iconDay = getIconDay(obj)
        return retval
    }

    function getIconNight(obj) {
        let icon = obj.Night.Icon
        console.log(icon)
        if ([33, 34].includes(icon)) return 'svg/10.svg'
        if ([35, 36, 37, 38].includes(icon)) return 'svg/11.svg'
        if ([7, 8, 11].includes(icon)) return 'svg/3.svg'
        if ([12, 13, 14, 15, 18, 39, 40].includes(icon)) return 'svg/4.svg'
        return icon
    }

    function getIconDay(obj) {
        let icon = obj.Day.Icon
        if ([1, 2].includes(icon)) return 'svg/1.svg'
        if ([3, 4, 5, 6].includes(icon)) return 'svg/2.svg'
        if ([7, 8, 11].includes(icon)) return 'svg/3.svg'
        if ([12, 13, 14, 18].includes(icon)) return 'svg/4.svg'
        if ([15, 16, 17].includes(icon)) return 'svg/5.svg'
        return icon
    }

    function getWeatherOfCity(cityId, callback) {
        const apikey = 'gHuEn9ghiy20CHSHAJ4ccgWcdU0XWkGS'
        var url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + cityId + '?language=vi&apikey=' + apikey

        /*
        var data = JSON.parse(`{"Headline":{"EffectiveDate":"2019-02-01T01:00:00+07:00","EffectiveEpochDate":1548957600,"Severity":4,"Text":"Mưa cuối đêm Thứ Năm","Category":"rain","EndDate":"2019-02-01T07:00:00+07:00","EndEpochDate":1548979200,"MobileLink":"http://m.accuweather.com/vi/vn/hanoi/353412/extended-weather-forecast/353412","Link":"http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412"},"DailyForecasts":[{"Date":"2019-01-31T07:00:00+07:00","EpochDate":1548892800,"Temperature":{"Minimum":{"Value":64.0,"Unit":"F","UnitType":18},"Maximum":{"Value":76.0,"Unit":"F","UnitType":18}},"Day":{"Icon":6,"IconPhrase":"Nhiều mây"},"Night":{"Icon":12,"IconPhrase":"Mưa rào"},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=1","Link":"http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=1"},{"Date":"2019-02-01T07:00:00+07:00","EpochDate":1548979200,"Temperature":{"Minimum":{"Value":63.0,"Unit":"F","UnitType":18},"Maximum":{"Value":72.0,"Unit":"F","UnitType":18}},"Day":{"Icon":6,"IconPhrase":"Nhiều mây"},"Night":{"Icon":34,"IconPhrase":"Quang mây"},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=2","Link":"http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=2"},{"Date":"2019-02-02T07:00:00+07:00","EpochDate":1549065600,"Temperature":{"Minimum":{"Value":65.0,"Unit":"F","UnitType":18},"Maximum":{"Value":74.0,"Unit":"F","UnitType":18}},"Day":{"Icon":8,"IconPhrase":"U ám"},"Night":{"Icon":38,"IconPhrase":"Nhiều mây"},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=3","Link":"http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=3"},{"Date":"2019-02-03T07:00:00+07:00","EpochDate":1549152000,"Temperature":{"Minimum":{"Value":67.0,"Unit":"F","UnitType":18},"Maximum":{"Value":76.0,"Unit":"F","UnitType":18}},"Day":{"Icon":6,"IconPhrase":"Nhiều mây"},"Night":{"Icon":38,"IconPhrase":"Nhiều mây"},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=4","Link":"http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=4"},{"Date":"2019-02-04T07:00:00+07:00","EpochDate":1549238400,"Temperature":{"Minimum":{"Value":66.0,"Unit":"F","UnitType":18},"Maximum":{"Value":75.0,"Unit":"F","UnitType":18}},"Day":{"Icon":8,"IconPhrase":"U ám"},"Night":{"Icon":18,"IconPhrase":"Mưa"},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=5","Link":"http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=5"}]}`)
        processServerData(data, callback)
        return
        */

        fetch(url)
            .then(res => res.json())
            .then(data => {
                processServerData(data, callback)
            })
    }

    function processServerData(data, callback) {
        var temp = []
        data.DailyForecasts.forEach(day => temp.push(parseWeatherInfo(day)))
        callback(temp)
    }

    function getHanoiWeather(callback) {
        var cityId = 353412
        getWeatherOfCity(cityId, callback)
    }

    return {
        getWeatherOfCity,
        getHanoiWeather
    }
})()
