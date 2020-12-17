YouTube

var MP4_QUALITY_MAP = {
    "22": "HD 720",
    "18": "SD 360"
};

function queryStringToJson(queryString) {
		return JSON.parse("{ \"" + queryString.replace(/\"/g, "\\\"").replace(/&/g, "\", \"").replace(/=/g, "\": \"") + "\" }");
	}

function alterVideoUrl(url, title) {
		//url = URLDecoder.decode(url);
		url = url.replace(/%2F/g, "/").replace(/%2C/g, ",");
		return url + "&title=" + title; // Add 'title' parameter to download file instead of view file on the browser 
	}

    var url = location.href;
    fetch(url)
        .then(res => res.text())
        .then(html => {
            var lines = html.split("\n");
            var clue = 'ytplayer.config = {';
            var line = lines.find(s => s.includes(clue));
            if (line) {
                //console.log(line);
                var startIdx = line.indexOf(clue);
                var endIdx = line.indexOf("};", startIdx);
                var jsonText = line.substring(startIdx + clue.length - 1, endIdx + 1);
                

                var jsonRoot = JSON.parse(jsonText);
                console.log(jsonRoot);
                var args = jsonRoot.args;
                var title = args.title;
                console.log(title);
                var streamMap = args.url_encoded_fmt_stream_map.split(',');
                var retval = [];
                streamMap.forEach(s => {  
                    s = s.replace("\u0026", "&");
                    //console.log(s);
                    //return;
                    var jsonObject = queryStringToJson(s);
                    var itag = jsonObject.itag;
                    //console.log(itag);
                    //return;
                    // Get only MP4 format
                    var quality = MP4_QUALITY_MAP[itag];
                    if (quality) {
                        var url = jsonObject.url;
                        url = alterVideoUrl(url, title);
                        console.log(url);
                        retval.push({ quality, url, title });
			        }

                });
            }
        });

//url=https%3A%2F%2Fr2---sn-42u-i2is.googlevideo.com%2Fvideoplayback%3Fsignature%3D375CAEBA607D96263EFA865103DA368430EB0E22.A7DC7B5D66F7FF19A51A25ADC220A709F50F568A%26ratebypass%3Dyes%26clen%3D67233531%26ipbits%3D0%26initcwndbps%3D1211250%26dur%3D0.000%26itag%3D43%26pl%3D21%26source%3Dyoutube%26c%3DWEB%26expire%3D1541537656%26txp%3D5411222%26mime%3Dvideo%252Fwebm%26lmt%3D1541514119437722%26ei%3DGKvhW4mPBc3pqAHAh6rgCA%26fvip%3D4%26requiressl%3Dyes%26ip%3D113.23.51.187%26key%3Dyt6%26mt%3D1541515963%26mv%3Dm%26beids%3D9466587%26ms%3Dau%252Crdu%26mm%3D31%252C29%26mn%3Dsn-42u-i2is%252Csn-42u-i5ol%26id%3Do-APoSN0boXAcghHiftGgByDdScd6CCfJxaHczsCGsVwKG%26gir%3Dyes%26sparams%3Dclen%252Cdur%252Cei%252Cgir%252Cid%252Cinitcwndbps%252Cip%252Cipbits%252Citag%252Clmt%252Cmime%252Cmm%252Cmn%252Cms%252Cmv%252Cpl%252Cratebypass%252Crequiressl%252Csource%252Cexpire&itag=43&type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22&quality=medium
