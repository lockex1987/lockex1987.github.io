var app = angular.module('myApp', ["pagi"]);

app.controller('UserController', function($scope) {
	
	// Tiêu chí tìm kiếm
	$scope.criteria = {
			query: ""
	};
	
	// Kết quả tìm kiếm
	$scope.items;
	
	// Đối tượng phân trang
	$scope.pag = new Pagi();
	
	// Màn hình hiển thị, 'list' hay 'form'
	$scope.screen = 'list';

	// Loại 'create' hay 'update'
	$scope.actionType;
	
	// Đối tượng form
	$scope.obj = {};

	/**
	 * Tìm kiếm.
	 */
    $scope.search = function(page) {
    	// Thêm tham số page
    	$scope.criteria.page = page;
    	
    	var params = $scope.criteria;

        $.ajax({
        	url: 'user/search',
            type: 'GET',
            data: params,
            success: function(data) {
            	$scope.$apply(function() {
            		$scope.pag.setting(data.totalRecord, page);
                    $scope.items = data.items;
                });
            }
        });
    };
    
    /**
     * Bật form thêm mới.
     */
    $scope.openCreateForm = function() {
    	$scope.screen = 'form';
    	
    	// Loại là thêm mới
    	$scope.actionType = 'create';
    	
    	$scope.obj = {};
    };
    
    /**
     * Bật form cập nhật.
     */
    $scope.openUpdateForm = function(id) {
        var params = { id };
        $.ajax({
            url: 'user/get',
            type: "GET",
            data: params,
            success: function(data) {
                $scope.$apply(function() {
                	$scope.screen = 'form';
                	$scope.actionType = 'update';
                    $scope.obj = data;
                });
            }
        });
    };
    
    /**
     * Xóa bản ghi
     */
    $scope.deleteRecord = function(id) {
        var params = { id };
        noti.confirm("Bạn có muốn xóa bản ghi này?", function() {
        	$.ajax({
                url: 'user/delete',
                type: "POST",
                data: params,
                success: function(data) {
                	$scope.$apply(function() {
                		switch (data.returnCode) {
	                        case 0:
	                            noti.success("Xóa thành công");
	
	                            // Tìm lại ở chính trang hiện tại
	                            $scope.search($scope.pag.currentPage);
	                            break;
	
	                        default:
	                            break;
	                    }
                	});
                }
            });
        });
    };
    
    /**
     * Hàm thêm/sửa.
     */
    $scope.save = function() {
    	// Validate JavaScript
    	if (invalidForm("#frm")) {
    		return;
    	}
    	
    	noti.confirm("Bạn có muốn lưu dữ liệu?", function() {
    		// Lưu trên server
            var params = $scope.obj;
            $.ajax({
                url: 'user/save',
                type: "POST",
                data: params,
                success: function(data) {
                	$scope.$apply(function() {
                		
                		switch (data.returnCode) {
    	                    case 1:
    	                    	showError($("#loginName"), "Tên đã tồn tại");
    	                    	$("#loginName").focus();
    	                        break;
    	
    	                    case 0:
    	                        noti.success(($scope.actionType == 'create' ? "Thêm mới" : "Cập nhật") + " thành công");

		                        if ($scope.actionType == 'create') {
		                        	// Reset form
			                        $scope.obj = {};
			                        
		                        	// Tìm kiếm lại từ trang đầu
			                        $scope.search(1);
		                        } else {
		                        	// Quay về trang danh sách
			                        $scope.screen = 'list';
	
		                        	// Tìm lại ở chính trang hiện tại
		                            $scope.search($scope.pag.currentPage);
		                        }
    	                        
    	                        break;
    	                }
                	});
                }
            });
    	});
    };
    
    /**
     * Trở lại form danh sách
     */
    $scope.returnListScreen = function() {
    	$scope.screen = 'list';
    	
    	// Xóa các thông báo lỗi hiện tại
    	clearErrorMessages("frm");
    };

    function init() {
        $scope.search(1);
    }

    init();
});