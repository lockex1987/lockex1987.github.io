<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>Quản lý người dùng</title>
	
	<jsp:include page="/WEB-INF/fragments/jsCss.jsp"></jsp:include>
</head>

<body>	
	<div ng-cloak ng-app="myApp" ng-controller="UserController" class="container">
			<section ng-show="screen == 'list'" class="mw">
				<fieldset>
					<legend>
						Tìm kiếm
					</legend>
					
					<form id="frmSearch" class="form-horizontal" ng-submit="search(1)">			
						<div class="form-group">
							<div class="col-md-6 col-md-offset-3">
								<input type="text" id="query" name="query" ng-model="criteria.query" maxlength="50" placeholder="Nhập tên, email, số điện thoại" class="form-control"/>
							</div>
						</div>
						
						<div class="text-center col-md-12">
							<button type="submit" class="btn btn-primary">
								Tìm kiếm
							</button>
							<button type="button" class="btn btn-default" ng-click="openCreateForm()">
								Thêm mới
							</button>					
						</div>
					</form>
				</fieldset>
			
				<fieldset>
					<legend>
						Danh sách người dùng 
					</legend>
					
					<div ng-show="items.length == 0" class="text-danger">
						Không tìm thấy bản ghi
					</div>

					<div ng-show="items.length > 0" class="table-responsive">
	                    <table class="table table-hover" id="tableId">
	                        <thead>
	                            <tr class="table-heading">
	                                <th class="text-right">Stt</th>
	                                <th>Tên đăng nhập</th>
	                                <th>Tên đầy đủ</th>
	                                <th>Email</th>
	                                <th>Số điện thoại</th>
	                                <th class="text-center"></th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <tr ng-repeat="e in items track by $index">
	                                <td class="text-right">
	                                    {{pag.startIndex + 1 + $index}}
	                                </td>
	                                <td>
	                                    {{e.loginName}}
	                                </td>
	                                <td>
	                                    {{e.fullName}}
	                                </td>
	                                <td>
	                                    {{e.email}}
	                                </td>
	                                <td>
	                                    {{e.phone}}
	                                </td>
	                                <td class="col-md-cus-1 text-center">
	                                    <a ng-click="openUpdateForm(e.id)" class="link-action" title="Cập nhật">
	                                        <span class="fa fa-pencil"></span>
	                                    </a>
	                                    <a ng-click="deleteRecord(e.id)" class="link-action" title="Xóa">
	                                        <span class="fa fa-trash"></span>
	                                    </a>
	                                </td>
	                            </tr>
	                        </tbody>
	                    </table>
	                </div>
	                
	                <pagi ref="pag" action="search(page)"></pagi>
				</fieldset>
			</section>
			
			<section ng-show="screen == 'form'" class="mw">
				<fieldset>
					<legend>
						Thông tin người dùng
					</legend>
				
					<form id="frm" class="form-horizontal" ng-submit="save()">
						<div class="form-group validate-container">
							<label class="control-label col-md-4">
								Tên đăng nhập
								(*)
							</label>
							<div class="col-md-8">
								<input type="text" name="loginName" id="loginName" ng-model="obj.loginName" maxlength="50"
										class="form-control" data-required="true"/>
							</div>
						</div>
						<div class="form-group validate-container">
							<label class="control-label col-md-4">
								Tên đầy đủ
								(*)
							</label>
							<div class="col-md-8">
								<input type="text" name="fullName" id="fullName" ng-model="obj.fullName" maxlength="100" class="form-control"
										data-required="true"/>
							</div>
						</div>
						<div class="form-group validate-container">
							<label class="control-label col-md-4">
								Email
							</label>
							<div class="col-md-8">
								<input type="text" id="email" name="email" ng-model="obj.email" class="form-control" maxlength="50"/>
							</div>
						</div>
						<div class="form-group validate-container">
							<label class="control-label col-md-4">
								Số điện thoại
							</label>
							<div class="col-md-8">
								<input type="phone" class="form-control" id="phone" name="phone" ng-model="obj.phone" class="form-control" maxlength="50"/>
							</div>
						</div>
						<div class="form-group validate-container">
							<label class="control-label col-md-4">
								Mật khẩu
							</label>
							<div class="col-md-8">
								<input type="password" class="form-control" id="password" name="password" ng-model="obj.password" maxlength="50" autocomplete="new-password"/>
							</div>
						</div>

						<div class="col-md-8 col-md-offset-4">
							<button class="btn btn-primary" type="submit">
								{{actionType == 'create' ? 'Thêm mới' : 'Cập nhật'}}
							</button>
							<button class="btn btn-default" ng-click="returnListScreen()" onclick="" type="button">
								Quay lại
							</button>
						</div>
					</form>
				</fieldset>
			</section>
	</div>
	
	<script src="js/user.js"></script>
</body>
</html>
