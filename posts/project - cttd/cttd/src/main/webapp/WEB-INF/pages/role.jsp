<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>Quản lý vai trò</title>
	
	<jsp:include page="/WEB-INF/fragments/jsCss.jsp"></jsp:include>
</head>

<body>	
	<div ng-cloak ng-app="myApp" ng-controller="RoleController" class="container">
	
									<section ng-show="screen == 'list'" class="mw">
										<fieldset>
											<legend>
												Tìm kiếm
											</legend>
											
											<form id="frmSearch" class="form-horizontal" ng-submit="search(1)">			
												<div class="form-group">
													<div class="col-md-6 col-md-offset-3">
														<input type="text" id="query" name="query" ng-model="criteria.query" maxlength="50" placeholder="Nhập mã hoặc tên" class="form-control"/>
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
												Danh sách vai trò
											</legend>
											
											<div ng-show="items.length == 0" class="text-danger">
												Không tìm thấy bản ghi
											</div>
						
											<div ng-show="items.length > 0" class="table-responsive">
							                    <table class="table table-hover table-striped" id="tableId">
							                        <thead>
							                            <tr class="table-heading">
							                                <th class="text-right">Stt</th>
							                                <th>Mã</th>
							                                <th>Tên</th>
							                                <th class="text-center"></th>
							                            </tr>
							                        </thead>
							                        <tbody>
							                            <tr ng-repeat="e in items track by $index">
							                                <td class="text-right">
							                                    {{pag.startIndex + 1 + $index}}
							                                </td>
							                                <td>
							                                    {{e.code}}
							                                </td>
							                                <td>
							                                    {{e.name}}
							                                </td>
							                                <td class="text-center">
							                                    <a ng-click="openUpdateForm(e.id)" class="link-action" title="Cập nhật">
							                                        <span class="fa fa-pencil"></span>
							                                    </a>
							                                    <a ng-click="deleteRecord(e.id)" class="link-action" title="Xóa">
							                                        <span class="fa fa-trash"></span>
							                                    </a>
							                                    <a ng-click="openUsersScreen(e)" class="link-action" title="Danh sách người dùng của nhóm">
							                                        <span class="fa fa-user"></span>
							                                    </a>
							                                </td>
							                            </tr>
							                        </tbody>
							                    </table>
							                    
							                    <pagi ref="pag" action="search(page)"></pagi>
							                </div>
										</fieldset>
									</section>
									
									<section ng-show="screen == 'form'" class="mw">
										<fieldset>
											<legend>
												Thông tin vai trò
											</legend>
										
											<form id="frm" class="form-horizontal" ng-submit="save()">
												<div class="form-group validate-container">
													<label class="control-label col-md-4">
														Mã
														(*)
													</label>
													<div class="col-md-8">
														<input type="text" name="code" id="code" ng-model="obj.code" maxlength="50" class="form-control" data-required="true"/>
													</div>
												</div>
												<div class="form-group validate-container">
													<label class="control-label col-md-4">
														Tên
														(*)
													</label>
													<div class="col-md-8">
														<input type="text" name="name" id="name" ng-model="obj.name" maxlength="50" class="form-control" data-required="true"/>
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
									
									<section ng-show="screen == 'users'" class="mw">
										<fieldset>
											<legend>
												Danh sách người dùng của nhóm {{obj.name}}
											</legend>
										
											<form id="frmUsers">
												<div ng-show="userItems.length == 0" class="text-danger">
													Không tìm thấy bản ghi
												</div>
							
												<div ng-show="userItems.length > 0" class="table-responsive">
								                    <table class="table table-hover table-striped" id="tableId">
								                        <thead>
								                            <tr class="table-heading">
								                                <th class="text-right">Stt</th>
								                                <th>Tên đăng nhập</th>
								                                <th>Tên đầy đủ</th>
								                                <th class="text-center"></th>
								                            </tr>
								                        </thead>
								                        <tbody>
								                            <tr ng-repeat="e in userItems track by $index">
								                                <td class="text-right">
								                                    {{pagUser.startIndex + 1 + $index}}
								                                </td>
								                                <td>
								                                    {{e.loginName}}
								                                </td>
								                                <td>
								                                    {{e.fullName}}
								                                </td>
								                                <td class="text-center">
								                                	<input type="checkbox" ng-click="checkUser(e)" ng-model="e.checked"/>
								                                </td>
								                            </tr>
								                        </tbody>
								                    </table>
								                    
								                    <pagi ref="pagUser" action="gotoPage(page)"></pagi>
								                </div>
											</form>
											
											<div class="text-center">
												<button class="btn btn-primary" ng-click="returnListScreen()" onclick="" type="button">
													Quay lại
												</button>
											</div>
										</fieldset>
									</section>
	</div>
	
	<script src="js/role.js"></script>
</body>
</html>
