var app = angular.module('myApp', ["pagi"]);

app.controller('RoleController', function($scope) {
	
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
	
	// Danh sách tất cả người dùng
	$scope.allUsers;
	
	// Phân trang của người dùng
	$scope.pagUser = new Pagi();
	
	// Danh sách người dùng trên một trang
	$scope.userItems;

	/**
	 * Tìm kiếm.
	 */
    $scope.search = function(page) {
    	var params = $scope.criteria;
    	
    	// Thêm tham số page
    	params.page = page;

        $.ajax({
        	url: 'role/search',
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
            url: 'role/get',
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
                url: 'role/delete',
                type: "POST",
                data: params,
                success: function(data) {
                	$scope.$apply(function() {
                    	noti.success("Xóa thành công");

                        // Tìm lại ở chính trang hiện tại
                        $scope.search($scope.pag.currentPage);
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
    	
    	noti.confirm("Bạn có muốn lưu lại?", function() {
    		// Lưu trên server
            var params = $scope.obj;
            
            $.ajax({
                url: 'role/save',
                type: "POST",
                data: params,
                success: function(data) {
                	$scope.$apply(function() {
                		switch (data.returnCode) {
    	                    case 1:
    	                    	showError($("#name"), "Tên đã tồn tại");
    	                    	$("#name").focus();
    	                        break;

    	                    case 0:
    	                        noti.success(($scope.actionType == 'create' ? "Thêm mới" : "Cập nhật") + " thành công");

    	                        if ($scope.actionType == 'create') {
    	                        	// Reset form
    		                        $scope.obj = {
    		                        		note: ""
    		                        };
    		                        
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
    
    /**
     * Bật màn hình danh sách người dùng.
     */
    $scope.openUsersScreen = function(e) {
    	$scope.screen = 'users';
    	
    	$scope.obj = e;
    	
    	// Lấy tất cả người dùng
    	var params = {
    			roleId: e.id
    	};
    	$.ajax({
        	url: 'role/user/get-all',
            type: 'GET',
            data: params,
            success: function(data) {
            	$scope.$apply(function() {
            		$scope.allUsers = data;
                    //console.log(JSON.stringify(data));
                    $scope.gotoPage(1);
                });
            }
        });
    };
    
    /**
     * Chuyển đến trang thứ x của danh sách người dùng.
     */
    $scope.gotoPage = function(page) {
        var startIndex = (page - 1) * $scope.pagUser.pageSize;
        $scope.userItems = $scope.allUsers.slice(startIndex, startIndex + 10);
        $scope.pagUser.setting($scope.allUsers.length, page);
        
    };
    
    /**
     * Chọn/bỏ chọn người dùng
     */
    $scope.checkUser = function(e) {
    	if (e.checked) {
    		var params = {
        			userId: e.userId,
        			roleId: e.roleId
        	};
    		// Thêm người dùng
    		$.ajax({
                url: 'role/user/add',
                type: "POST",
                data: params,
                success: function(data) {
                	//console.log(data.returnCode);
                	e.id = data.id;
                }
    		});
    	} else {
    		var params = {
    				userRoleId: e.id
        	};
    		// Loại bỏ người dùng
    		$.ajax({
                url: 'role/user/remove',
                type: "POST",
                data: params,
                success: function(data) {
                	//console.log(data.returnCode);
                	e.id = null;
                }
    		});
    	}
    };

    function init() {
        $scope.search(1);
    }

    init();
});