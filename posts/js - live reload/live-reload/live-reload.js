var Live = (function() {

  // Các tài nguyên (HTML, JS, CSS)
  // Có khóa là URL, giá trị là thông tin header
  var resources = {};

  // Map các URL đang được kiểm tra
  // Nếu đang kiểm tra rồi thì không kiểm tra nữa
  var pendingRequests = {};

  // Các link CSS hiện tại
  // Khóa là URL, giá trị là đối tượng DOM
  var currentLinkElements = {};

  // Các link CSS cũ để bỏ đi
  // Khóa là URL, giá trị là đối tượng DOM
  var oldLinkElements = {};

  // Đã load xong các tài nguyên lần đầu tiên chưa
  var loaded = false;

  /**
   * Vòng lặp kiểm tra các thay đổi.
   */
  function heartbeat() {
    // Nếu trang web đã load xong
    if (document.body) {
      // Load tất cả các tài nguyên lần đầu tiên
      if (!loaded) {
        loadResources();
      }

      // Kiểm tra thay đổi
      checkForChanges();
    }

    // 1 giây gọi 1 lần
    setTimeout(heartbeat, 1000);
  }

  /**
   * Hàm kiểm tra xem một URL có phải là local (cùng domain) hay không.
   * @param url Địa chỉ URL
   */
  function isLocal(url) {
    var loc = document.location;
    var reg = new RegExp("^\\.|^\/(?!\/)|^[\\w]((?!://).)*$|" + loc.protocol + "//" + loc.host);
    return url.match(reg);
  }

  /**
   * Load tất cả các tài nguyên CSS, JS lần đầu tiên.
   * Chỉ load các tài nguyên local thôi.
   * Các tài nguyên ở domain khác như CDN thì không kiểm tra.
   */
  function loadResources() {
    var uris = [];
    
    // Thêm trang HTML hiện tại
    uris.push(document.location.href);

    // Các file JS
    document.querySelectorAll("script").forEach(script => {
      var src = script.src;
      //console.log(src);
      if (src && isLocal(src)) {
        uris.push(src);
      }
    });

    // Các file CSS
    document.querySelectorAll('link').forEach(link => {
      var rel = link.getAttribute("rel");
      var href = link.getAttribute("href", 2);
      if (href && rel && rel.match(new RegExp("stylesheet", "i")) && isLocal(href)) {
        uris.push(href);
        currentLinkElements[href] = link;
      }
    });

    // Lưu các thông tin ban đầu của các tài nguyên
    for (var i = 0; i < uris.length; i++) {
      var url = uris[i];
      getHead(url, function(url, info) {
        resources[url] = info;
      });
    }

    // Đánh dấu đã load xong các tài nguyên lần đầu tiên
    loaded = true;
  }

  /**
   * Kiểm tra các tài nguyên xem có thay đổi không.
   */
  function checkForChanges() {
    for (var url in resources) {
      // Nếu đang kiểm tra rồi thì không kiểm tra nữa
      if (pendingRequests[url])
        continue;

      // Kiểm tra các thông tin header xem có thay đổi không
      getHead(url, function(url, newInfo) {
        var oldInfo = resources[url];
        var hasChanged = false;
        resources[url] = newInfo;

        for (var header in oldInfo) {
          // do verification based on the header type
          var oldValue = oldInfo[header];
          var newValue = newInfo[header];
          var contentType = newInfo["Content-Type"];
          switch (header.toLowerCase()) {
            case "etag":
              if (!newValue) break;
            // fall through to default
            default:
              hasChanged = oldValue != newValue;
              break;
          }

          // Nếu thay đổi thì reload lại tài nguyên
          if (hasChanged) {
            refreshResource(url, contentType);
            break;
          }
        }
      });
    }
  }

  /**
   * Reload lại tài nguyên, tùy theo kiểu.
   * @param url Địa chỉ URL
   * @param type Kiểm (HTML, CSS, JS)
   */
  function refreshResource(url, type) {
    console.log('Reload', url);
    switch (type.toLowerCase()) {
      // CSS có thể load bằng cách thay thế thẻ link
      case "text/css":
        // Chèn link mới
        var link = currentLinkElements[url];
        var head = link.parentNode;
        var next = link.nextSibling;

        var newLink = document.createElement("link");
        newLink.setAttribute("type", "text/css");
        newLink.setAttribute("rel", "stylesheet");
        newLink.setAttribute("href", url + "?now=" + new Date() * 1);
        next ? head.insertBefore(newLink, next) : head.appendChild(newLink);

        // Cập nhật link CSS mới
        currentLinkElements[url] = newLink;

        // Bỏ link cũ
        oldLinkElements[url] = link;
        removeoldLinkElements();
        break;

      // Nếu là HTML hoặc JavaScript thì reload lại trang
      case "text/html":
      case "text/javascript":
      case "application/javascript":
      case "application/x-javascript":
        document.location.reload();
    }
  }

  /**
   * Loại bỏ các CSS cũ.
   * Chỉ loại bỏ các CSS cũ sau khi các CSS mới đã load xong.
   */
  function removeoldLinkElements() {
    var pending = 0;
    for (var url in oldLinkElements) {
      try {
        // Kiểm tra link mới đã có nội dung chưa
        var link = currentLinkElements[url];
        var sheet = link.sheet || link.styleSheet;
        var rules = sheet.rules || sheet.cssRules;

        if (rules.length >= 0) {
          var oldLink = oldLinkElements[url];
          oldLink.parentNode.removeChild(oldLink);
          delete oldLinkElements[url];
        }
      } catch (ex) {
        pending++;
      }

      if (pending) {
        setTimeout(removeoldLinkElements, 50);
      }
    }
  }

  /**
   * Thực hiện một request HEAD để lấy các header,
   * sau đó truyền thông tin header cho hàm callback.
   * TODO: Sử dụng fetch API.
   * Có thể test như sau:
   *   Live.getHead('demo.css', (url, info) => console.log(info))
   * @param url Địa chỉ URL
   * @param callback Hàm callback
   */
  function getHead(url, callback) {
    //console.log(url);

    // Đánh dấu đang kiểm tra
    pendingRequests[url] = true;

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XmlHttp");
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = function() {
      // Bỏ đánh dấu đang kiểm tra
      delete pendingRequests[url];

      if (xhr.readyState == 4 && xhr.status != 304) {
        // Lấy các thông tin header
        xhr.getAllResponseHeaders();
        var info = {};
        var headers = {
          "Etag": 1,
          "Last-Modified": 1,
          "Content-Length": 1,
          "Content-Type": 1
        };
        for (var h in headers) {
          var value = xhr.getResponseHeader(h);
          // adjust the simple Etag variant to match on its significant part
          //console.log(h, value);
          if (h.toLowerCase() == "etag" && value) {
            value = value.replace(/^W\//, '');
          }
          if (h.toLowerCase() == "content-type" && value) {
            value = value.replace(/^(.*?);.*?$/i, "$1");
          }
          info[h] = value;
        }

        // Gọi hàm callback
        callback(url, info);
      }
    }
    xhr.send();
  }

  // Trả về các API chìa ra ngoài
  return {
    heartbeat,
    getHead
  };
})();


// Không hỗ trợ file local
if (document.location.protocol == "file:") {
  console.log("Live-reload doesn't support the file protocol.");
} else {
  // Đảm bảo chỉ gọi hàm heartbeat một lần
  if (!window.liveJsLoaded) {
    Live.heartbeat();
    console.log('Live reload enabled');
  } else {
    console.log('Already enabled');
  }

  window.liveJsLoaded = true;
}