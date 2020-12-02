/*
Sử dụng mLab (Cloud DB)
	http://docs.mlab.com/
	http://docs.mlab.com/data-api/
		https://api.mlab.com/api/1/databases?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
		https://api.mlab.com/api/1/databases/lockex1987/collections?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
		https://api.mlab.com/api/1/databases/lockex1987/collections/coordinate?apiKey=lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s
*/
// Base URL của mLab
const MLAB_BASE_URL = 'https://api.mlab.com/api/1';
const MLAB_DATABASE = 'lockex1987';
const MLAB_COLLECTION = 'coordinate';
const MLAB_API_KEY = 'lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s';

var mlapUrl = MLAB_BASE_URL + '/databases/' + MLAB_DATABASE +
		'/collections/' + MLAB_COLLECTION +
		'?apiKey=' + MLAB_API_KEY;

// Đối tượng bản đồ
var map;

var markers = [];
var infoWindows = [];

// Mảng dữ liệu hiện tại
var data;

// Kinh do va vi do hien tai
var latitude;
var longitude;

var selectHtmlCode = "";

// Có phải đang lấy vị trí không
var gettingRoute = false;

// Đường hiện tại
var directionsDisplay;

// Đang xử lý lấy vị trí hiện tại
var gettingCurrentPosition = false;

// Marker vị trí hiện tại
var currentPosition;

function init() {
	var mapOptions = { center: { lat: 21.038364, lng: 105.902710 }, zoom: 11 };

	// Khởi tạo bản đồ với tâm là Hà Nội
	map = new google.maps.Map($("#map")[0], mapOptions);

	// Thêm sự kiện khi click vào bản đồ
	google.maps.event.addListener(map, 'click', function(e) {
		var p = e.latLng;

		updateLatLng(p.lat(), p.lng());
	});
}

function updateLatLng(lat, lng) {
	latitude = lat;
	longitude = lng;

	if (latitude) {
		$("#latitudeSpan").text(latitude);
		$("#longitudeSpan").text(longitude);
	} else {
		$("#latitudeSpan").text("...");
		$("#longitudeSpan").text("...");
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
}

function hideInfoWindows() {
	for (var i = 0; i < infoWindows.length; i++) {
		infoWindows[i].close();
	}
}

/**
 * Liệt kê dữ liệu hiện tại.
 */
function listInfo() {
	$.ajax({
			url: mlapUrl,
			type: "GET",
			contentType: "application/json",
			success: function(resp) {
				data = resp;

				
				data.push();
				
				// Xóa các list cũ và build list mới
				clearMarkers();
				hideInfoWindows();

				infoWindows = [];
				markers = [];
				data = [];
				
				selectHtmlCode = "<option value=''>-- Chọn --</option>";

				$("#listTable").html("");
				for (var i = 0; i < resp.length; i++) {
					var e = resp[i];

					addPoint(e);
				}
				
				// Fix một số giá trị
				const FIX_POINTS = [
					{
						"name": "Nhà Hưng Yên",
						"address": "Thôn Nguyễn, Cửu Cao, Văn Giang, Hưng Yên",
						"latitude": 20.963285,
						"longitude": 105.951277
					},
					{
						"name": "Nhà Hà Nội",
						"address": "Số 15, ngõ 196/133 Hồ Tùng Mậu",
						"latitude": 21.045543931196132,
						"longitude": 105.77075600624084
					},
					{
						"name": "Chỗ làm",
						"address": "Tầng 44 Keangnam",
						"latitude": 21.017639614497813,
						"longitude": 105.78245043754578
					}
				];
				
				// TODO: Nhà Dương ở Giao Thủy
				
				for (var i = 0; i < FIX_POINTS.length; i++) {
					addPoint(FIX_POINTS[i]);
				}
				
				// Cập nhật 2 select box
				$("#startPointSelect").html(selectHtmlCode).val("");
				$("#destPointSelect").html(selectHtmlCode).val("");
			}
		});
}

function addPoint(e) {
	//console.log(JSON.stringify(e));

	var idx = data.length;
	data.push(e);
	
	var aTag = $("<a href='#'></a>").text(e.name);
	aTag.click(showInfoWindow);
	aTag[0].dataset.idx = idx;
	var liTag = $("<li></li>").append(aTag);
	
	// Hiển thị nút xóa
	if (e._id) {
		var deleteLink = $("<a href='#' class='delete-link' title='Xóa'><span class='fa fa-trash'></span></a>");
		deleteLink.click(deletePoint);
		deleteLink[0].dataset.id = e._id.$oid;
		liTag.append(deleteLink);
	}

	$("#listTable").append(liTag);
	
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(e.latitude, e.longitude),
		map: map,
		title: e.name
	});

	var contentString = $("<div></div>")
					.append($("<label></label>").text(e.name + ": "))
					.append($("<span class='info'></span>").text(e.address))
					.html();
	infoWindows.push(new google.maps.InfoWindow({
		content: contentString
	}));

	// marker không phải đối tượng DOM bình thường nên không thể sử dụng marker.dataset.idx
	marker.dataset = { idx: idx };
	marker.addListener('click', showInfoWindow);

	markers.push(marker);
	
	// Thêm
	selectHtmlCode += "<option value='" + idx + "'>" + e.name + "</option>";
}

function displayFullscreenMap() {
	fullscreen($("#map-container")[0]);
}

function escapeFullscreenMap() {
	escapeFullscreen();
}

function showInfoWindow() {
	var idx = this.dataset.idx;
	//var e = data[idx];
	//var p = new google.maps.LatLng(e.latitude, e.longitude);
	//map.setCenter(p);
	
	hideInfoWindows();

	infoWindows[idx].open(map, markers[idx]);
}

function addInfo() {
	// Ẩn các lỗi cũ
	$("#frm .text-danger").hide();
	
	var name = $("#nameInput").val();
	var address = $("#addressInput").val();

	if (!name.trim()) {
		$("#empty-name").show();
		return;
	}

	if (!latitude) {
		$("#empty-coordinates").show();
		return;
	}

	var params = JSON.stringify({
		"name" : name.trim(),
		"address": address.trim(),
		"latitude": latitude,
		"longitude": longitude
	});
		
	// Lưu ở server
	$.ajax({
		url: mlapUrl,
		data: params,
		type: "POST",
		contentType: "application/json",
		success: function(result) {
			// Clear các thông tin cũ
			$("#frm input").val("");
			
			updateLatLng(undefined, undefined);
			
			// Tìm kiếm lại
			listInfo();
		}
	});
}

function deletePoint() {
	var id = this.dataset.id;

	$.ajax({
		url: MLAB_BASE_URL + '/databases/' + MLAB_DATABASE +
			'/collections/' + MLAB_COLLECTION +
			"/" + id +
			'?apiKey=' + MLAB_API_KEY,
		type: "DELETE",
		success: function(data) {
			// Tìm kiếm lại
			listInfo();
		}
	});
}

function clickShowRoute() {
	// Nếu đang tìm dường thì không làm gì
	if (gettingRoute) {
		return;
	}
	
	// Ẩn các lỗi cũ
	$("#frmRoute .text-danger").hide();
	
	if ($("#startPointSelect").val() == "") {
		$("#empty-startPointSelect").show();
		return;
	}
	
	if ($("#destPointSelect").val() == "") {
		$("#empty-destPointSelect").show();
		return;
	}
	
	if ($("#destPointSelect").val() == $("#startPointSelect").val()) {
		$("#different-point").show();
		return;
	}
	
	// Bắt đầu tìm đường
	gettingRoute = true;
	$("#gettingRouteSpan").show();
	
	var startIdx = parseInt($("#startPointSelect").val());
	var destIdx = parseInt($("#destPointSelect").val());
	
	showRoute(data[startIdx], data[destIdx]);
}

function showRoute(startPoint, destPoint) {
	// Xóa đường hiện tại
	if (directionsDisplay) {
		directionsDisplay.setMap(null);
	}
	
	// Tìm đường
	var rendererOptions = { map: map };
	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	var request = {
		origin: new google.maps.LatLng (startPoint.latitude, startPoint.longitude),
		destination: new google.maps.LatLng (destPoint.latitude, destPoint.longitude),
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	var directionsService = new google.maps.DirectionsService();
	
	directionsService.route(request, function(response, status) {
		// Đã tìm đường xong
		gettingRoute = false;
		$("#gettingRouteSpan").hide();
	
		//console.log(response);
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			var distance = response.routes[0].legs[0].distance.text;
			$("#routeResult").text('Khoảng cách: ' + distance);
		} else {
			$("#routeResult").text('Chỉ đường thất bại');
		}
	});
}

function getCurrentPosition() {
	if (gettingCurrentPosition) {
		return;
	}
	
	// Đang lấy vị trí hiện tại
	gettingCurrentPosition = true;
	$("#gettingCurrentPositionSpan").show();
	
	navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess, getCurrentPositionError);
}

function getCurrentPositionSuccess(e) {
	// Đã lấy xong vị trí hiện tại
	gettingCurrentPosition = false;
	$("#gettingCurrentPositionSpan").hide();
	
	console.log(e);
	
	// Xóa marker cũ
	if (currentPosition) {
		currentPosition.setMap(null);
	}
	
	
	// Thêm marker mới
	var coord = new google.maps.LatLng(e.coords.latitude, e.coords.longitude);
	currentPosition = new google.maps.Marker({
		position: coord,
		map: map,
		title: "Bạn đang ở đây",
		icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	});
	
	map.setZoom(15);
	map.setCenter(coord);
	
	updateLatLng(e.coords.latitude, e.coords.longitude);
}

function getCurrentPositionError(error) {
	// Đã lấy xong vị trí hiện tại
	gettingCurrentPosition = false;
	$("#gettingCurrentPositionSpan").hide();
	
	switch(error.code) {
		case error.PERMISSION_DENIED:
			console.log("Người sử dụng từ chối cho xác định vị trí.");
			break;
		case error.POSITION_UNAVAILABLE:
			console.log("Thông tin vị trí không có sẵn.");
			break;
		case error.TIMEOUT:
			console.log("Yêu cầu vị trí người dùng vượt quá thời gian quy định.");
			break;
		case error.UNKNOWN_ERROR:
			console.log("Một lỗi xảy ra không rõ nguyên nhân.");
			break;
	}
}

function addFullscreenListener() {
	document.addEventListener("fullscreenchange", fullscreenChangeCallback);
	document.addEventListener("webkitfullscreenchange", fullscreenChangeCallback);
	document.addEventListener("mozfullscreenchange", fullscreenChangeCallback);
	document.addEventListener("MSFullscreenChange", fullscreenChangeCallback);
}

function fullscreenChangeCallback() {
	if (isFullscreen()) {
		$("#resize-button a").hide();
		//$("#displayFullscreenLink").hide();
		$("#escapeFullscreenLink").show();
	} else {
		$("#resize-button a").show();
		//$("#displayFullscreenLink").show();
		$("#escapeFullscreenLink").hide();
	}
}

function showPanel(activePanel) {
	$(".side-panel").hide();
	$("#" + activePanel).show();
}

// Don't start the process until Windows "load" event is completed
google.maps.event.addDomListener(window, 'load', function() {
	showPanel('list-panel');
	init();
	listInfo();
	addFullscreenListener();
});
