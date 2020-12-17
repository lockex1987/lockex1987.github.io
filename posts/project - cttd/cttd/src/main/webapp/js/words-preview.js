/**
 * Hiển thị preview các file ảnh
 */
var Preview = (function() {

	// The file input tag
	var input = document.getElementById("images");
	// Current chosen files
	// Use this array to handle multiple files
	var currentFiles = [];
	// Preview list
	var previewList = $("#previewList");
	// Preview element
	var previewElement = previewList.find("li").clone();
	
	// Remove an existing file (by index)
	function removeFile(idx) {
		// Remove preview tag
		var currentPreview = currentFiles[idx].preview;
		//alert(currentPreview.html());
		var parentTag = currentPreview.parent();
		parentTag.remove(currentPreview);

		// Remove the element in the array
		currentFiles.splice(idx, 1);
	}
	
	// Show preview of chosen file
	function showPreview(source) {
		// Create DOM element
		var newPreview = previewElement.clone();
		var img = newPreview.find("img");
		img.attr("src", source);

		// Delete action
		newPreview.find(".deleteButton").click(deletePreviewImage);

		previewList.append(newPreview);
		
		// Update the last element of currentFiles
		//alert(newPreview.html());
		//alert(currentFiles.length);
		currentFiles[currentFiles.length - 1].preview = newPreview;
	}

	/**
	 * Delete image event
	 * Khi nhấn vào delete preview
	 * Xóa ảnh
	 */
	function deletePreviewImage() {
		//alert(this.innerHTML);
		var liTag = this.parentNode;
		var ulTag = liTag.parentNode;

		var children = ulTag.children;
		var idx = 0;
		for (var i = 0; i < children.length; i++) {
			if (children[i] == liTag) {
				idx = i;
				break;
			}
		}

		//alert(idx);

		//removeFile(idx);
		ulTag.removeChild(liTag);
		currentFiles.splice(idx, 1);
	}

	/**
	 * onchange function of the file chooser
	 * Nhấn vào chọn ảnh
	 * Hiển thị preview
	 * Kiểm tra ảnh đã đã tồn tại chưa (để tránh trùng lặp)
	 */ 
	function processWhenChooseFile() {
		var file = input.files[0];
		if (file.type.match(/image.*/)) {
			processEachFile(file);
		} else {
			input.value = "";
			noti.error("Only image, please!");
		}
	}
	
	function processEachFile(file) {
		// Check if the file already exists
		var i;
		var found = -1;
		for (i = 0; i < currentFiles.length; i++) {
			if (file.name == currentFiles[i].file.name) {
				found = i;
				break;
			}
		}
		
		// If the file is already added
		if (found > -1) {
			noti.error("Found");
			removeFile(found);
		}

		// Add new element
		currentFiles.push({ file: file });
		
		var reader = new FileReader();
		reader.onloadend = function(e) {
			// Show preview
			showPreview(e.target.result);
			// Reset file input tag
			input.value = "";
		};
		reader.readAsDataURL(file);
	}
	
	// Clear preview images
	function clearPreview() {
		previewList.html("");
	}
	
	// Reset chosen files
	function resetChosenFiles() {
		currentFiles = [];
	}
	
	// Return chosen files
	function getChosenFiles() {
		return currentFiles;
	}

	(function() {
		if (!window.FormData || !window.FileReader) {
			noti.error("Your browser is not supported");
		} else {
			// Set behaviours
			input.onchange = processWhenChooseFile;

			// There is no preview in the beginning
			clearPreview();
		}
	})();
	
	return {
		clearPreview: clearPreview,
		resetChosenFiles: resetChosenFiles,
		getChosenFiles: getChosenFiles
	}
})();