var app = angular.module('myApp', []);

app.controller('WordController', function($scope) {
	
	// Text tìm kiếm
	$scope.text = "";
	
	// Danh sách từ tìm kiếm được
	$scope.wordList;
	
	// Từ đang được xem
	$scope.word;
	
	// Đối tượng form (thêm mới hoặc cập nhật)
	$scope.frm = {};
	
	/**
	 * Goi den server mot request tim kiem theo xau dang nhap.
	 * TODO: Cần debounce hàm cho đỡ gọi nhiều lần
	 * Đánh chữ vào ô tìm kiếm
	 * Hiển thị danh sách các từ tìm kiếm được (khi người dùng đã đánh 2 chữ cái)
	 * Nếu người dùng nhấn ENTER thì vào màn hình xem của từ đầu tiên
	 */
	$scope.showSuggestions = function($event) {
		//console.log($scope.text);

		// Bat dau tim kiem khi nhap tu 2 ky tu tro len
		if ($scope.text.length > 1) {
			// Khi người dùng nhấn ENTER thì sẽ không gọi hàm tìm kiếm
			// mà gọi hàm hiển thị từ đầu tiên tìm thấy
			//console.log($event.keyCode);
			if ($event.keyCode == 13) {
				$.ajax({
					type: "GET",
					url: "word/search-one",
					data: { text: $scope.text },
					cache: false,
					success: function(obj) {
						if (obj) {
							// Hiển thị từ đầu tiên tìm kiếm được
							viewWord(obj);
						} else {
							console.log("Not found");
						}
					}
				});
			} else {
				$.ajax({
					type: "GET",
					url: "word/search",
					data: { text: $scope.text },
					cache: false,
					success: function(data) {
						// Hiển thị danh sách tìm kiếm được
						$scope.$apply(function() {
							$scope.wordList = data;
						});
					}
				});
			}
		}
	};
	
	/**
	 * Hành động khi click vào một từ (khi đó sẽ mở màn hình xem chi tiết).
	 * Click vào một từ nào đó trong danh sách bên trái
	 * Hiển thị màn hình view của từ đó
	 */
	$scope.clickWord = function(id) {
		// Không chuyển trang thẻ A
		//$event.preventDefault();
		
		// Hien thi man hinh xem chi tiet cua tu do
		$.ajax({
			type: "GET",
			url: "word/get",
			data: { id: id },
			success: function(obj) {
				viewWord(obj);
			}
		});
	};
	
	function viewWord(obj) {
		// Bind a word to view form
		obj.meanings = JSON.parse(obj.meanings);
		obj.examples = JSON.parse(obj.examples);
		obj.images = JSON.parse(obj.images);

		// Show view
		openView("#viewDiv");

		$scope.$apply(function() {
			$scope.word = obj;
		});
	}
	
	function openView(viewId) {
		// Ẩn 3 view (#homeDiv, #formDiv, #viewDiv)
		$(".view").hide();
		
		// Chỉ hiển view được chỉ định
		$(viewId).show();
	}

	/**
	 * Press insert link (add new word).
	 * Click vào link thêm mới
	 * Mở form thêm mới
	 * Reset lại các thông tin (kể các các ảnh đang được chọn).
	 */
	$scope.gotoForm = function() {
		// Reset form
		$scope.frm = {};

		// Open form
		openView("#formDiv");
	};

	/**
	 * This function is called when the user clicks the cancel link
	 * Nhấn vào nút Cancel
	 * Trở về màn hình trang chủ
	 * Focus vào ô tìm kiếm
	 */
	$scope.cancelForm = function() {
		openView("#homeDiv");		
	};
	
	/**
	 * This function is called when user clicks the update link.
	 */
	$scope.clickUpdateLink = function() {
		// TODO: Liệu có thay đổi cả bản ghi word k nhỉ?
		var frm = {
				id: $scope.word.id,
				word: $scope.word.word,
				pronounce: $scope.word.pronounce,
				images: $scope.word.images
		};
		
		// Bind meanings
		var temp = "";
		var i;
		var a = $scope.word.meanings;
		for (i = 0; i < a.length; i++) {
			temp += a[i].wordType + ': ' + a[i].meaning + (i == a.length - 1 ? '' : '\n');
		}
		frm.meanings = temp;
		
		// Bind examples
		temp = "";
		a = $scope.word.examples;
		for (i = 0; i < a.length; i++) {
			temp += a[i] + (i == a.length - 1 ? '' : '\n');
		}
		frm.examples = temp;
		
		// Deleted images
		frm.deletedImages = "";
		
		$scope.frm = frm;

		// Show update form
		openView("#formDiv");
	};
	
	/**
	 * Save data (insert or update).
	 * Click vào nút Save
	 * Lưu lại thông tin của từ (thêm hoặc sửa)
	 */
	$scope.saveForm = function() {
		if (confirm("Do you want to save?")) {			
			// Use XMLHttpRequest Object
			var req = new XMLHttpRequest();
			req.onreadystatechange = function() {
				if (req.readyState == 4 && req.status == 200) {
					// Vì xử lý AJAX thuần bằng JavaScript thế này nên phải sử dụng JSON.parse
					// req.responseText chỉ là xâu thôi
					uploadSuccess(JSON.parse(req.responseText));
				}
			};
			
			// Create data to submit and submit
			var formObj = document.getElementById("frm");
			var formData = new FormData(formObj);
			var i;
			var currentFiles = Preview.getChosenFiles();
			for (i = 0; i < currentFiles.length; i++) {
				formData.append("images", currentFiles[i].file);
			}
			req.open("post", "word/save");
			req.send(formData);
		}
	};
	
	/**
	 * Callback function which is executed when the upload is successful.
	 * @param obj
	 * @returns
	 */
	function uploadSuccess(obj) {
		// 0 = "success"
		if (obj.status === 0) {
			// Notify success
			noti.success("Save successfully");
			
			// Show view page
			// Trong truong hop thanh cong, thuoc tinh id chua ID cua ban ghi
			$scope.clickWord(obj.id);
			
			// Clear previews
			Preview.clearPreview();
			
			// Reset current chosen files
			Preview.resetChosenFiles();
		} else {
			// Show error
			noti.error("Error: " + obj.message);
		}
	}
	
	$scope.removeAttachFile = function(aTag, anImage) {
		var trTag = aTag.parentNode.parentNode;
		trTag.classList.add("deleted");

		aTag.parentNode.removeChild(aTag);

		var temp = $("#deletedImages").val();
		if (temp.length > 0) {
			temp += ",";
		}
		temp += anImage;
		$("#deletedImages").val(temp);
	};
	
	/**
	 * This function is called when user clicks the delete link.
	 * Click vào nút Delete
	 * Xóa từ đó khỏi DB
	 * Xóa ảnh
	 */
	$scope.clickDeleteLink = function() {
		if (confirm("Do you want to delete?")) {
			$.ajax({
				type: "POST",
				url: "word/delete",
				data: { id: $scope.word.id },
				success: function(obj) {
					// 0 = "success"
					if (obj.status === 0) {
						noti.success("Delete successfully");
						$scope.cancelForm();
					} else {
						noti.error("Error: " + obj.message);
					}
				}
			});
		}
	};
});
