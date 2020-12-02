/**
 * Created by nampth1 on 1/12/2018.
 */
require('../../bootstrap.js');

import { htmlEscapeEntities } from "../../app.helper.js";
import { appNotify } from '../../helpers/notifyHelper.js';

import {
    setupDataTableSearch,
    buildDataTableOption,
    setupDataTableControl
} from "../../helpers/datatableHelper.js";

import {
    deleteUserService,
    addUserService,
    updateUserService,
    changepassUserService,
    changeUserStatusService
} from "../../services/Admin/UserServices.js";

import { listAllRoleService } from "../../services/Admin/roleServices.js";

import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, {Validator} from 'vee-validate';

Validator.localize('vi', vi);

Validator.extend('isPassword', {
    getMessage: field => 'Mật khẩu phải gồm chữ hoa, chữ thường, ký tự số và ký tự đặc biêt!',
    validate: function (value) {
        var re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])[0-9a-zA-Z!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]');
        return re.test(value);
    }
});
Validator.extend('isNotDuplicate',
    {
        getMessage(field, [params], data) {
            return field + ' cần khác '+ params;
        },
        validate: function (value, [otherValue]) {
            return value !== otherValue;
        }

    },
    {
        hasTarget: true
    }
);

Vue.use(VeeValidate);


var vm = new Vue({
    el: '#app',

    data() {
        return {
            lowLevelManager: [
                'LowManager',
                'AdvanceSeeder',
                'NormalSeeder'
            ],
            listOrganization: null,
            userDataTable: null,
            userUrl: AppCommon.baseUrl + '/admin/user/listing',
            // Cấu hình các cột
            userColumns: [
                {
                    data: null,
                    name: 'STT',
                    title: 'STT',
                    width: '25px',
                    orderable: false
                },
                {
                    data: 'name',
                    name: 'name',
                    title: 'Tên người dùng',
                },
                {
                    data: 'email',
                    name: 'email',
                    title: 'Email'
                },
                {
                    data: 'phone',
                    name: 'phone',
                    title: 'SĐT'
                },
                {
                    data: 'address',
                    name: 'address',
                    title: 'Tổ chức',
                    orderable: false,
                },
                {
                    data: 'status',
                    name: 'status',
                    title: 'Trạng thái',
                    orderable: false,
                    className: 'text-center actions',
                    render: function (data, type, row) {
                        if (vm.changingStatus) {
                            return '<span class="m-loader m-loader--brand spinner"></span>';
                        }
                        if (data == '0') {
                            return `<span class="m-switch m-switch--sm m-switch--brand toggle-status customized on">
                                        <label>
                                            <input type="checkbox" checked="checked" name="">
                                            <span></span>
                                        </label>
                                    </span>`;
                        }
                        return `<span class="m-switch m-switch--sm m-switch--icon toggle-status customized off">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>`;
                    }
                },
                {
                    data: 'enable_totp',
                    name: 'enable_totp',
                    title: 'Xác thực 2 lớp',
                    orderable: false,
                    className: 'text-center',
                    render: function (data, type, row) {
                        if (data == '1') {
                            return `<span class="m-switch m-switch--sm m-switch--brand toggle-enable-totp customized on">
                                        <label>
                                            <input type="checkbox" checked="checked" name="">
                                            <span></span>
                                        </label>
                                    </span>`;
                        }
                        return `<span class="m-switch m-switch--sm m-switch--icon toggle-enable-totp customized off">
                                    <label>
                                        <input type="checkbox" name="">
                                        <span></span>
                                    </label>
                                </span>`;
                    }
                },
                {
                    data: null,
                    name: 'actions',
                    title: 'Hành động',
                    className: 'text-center actions',
                    orderable: false,
                    width: '120px',
                    render(data, type, row) {
                        return '\
                        <a href="javascript:;" class="action-changepass  m-portlet__nav-link btn m-btn--hover-brand  m-btn m-btn--icon m-btn--icon-only m-btn--pill inverse" title="Đổi mật khẩu">\
                            <i class="la la-key"></i>\
                        </a>\
                        <a href="javascript:;" class="action-edit m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill inverse" title="Chỉnh sửa">\
                            <i class="la la-edit"></i>\
                        </a>\
                        <a href="javascript:;" class="action-delete m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill inverse" title="Xóa">\
                            <i class="la la-trash"></i>\
                        </a>\
                        ';
                    }
                }
            ],
            currentUser: null,
            alertMessage: null,
            changePasswordAlertMessage: null,
            filterUserStr: '',
            roleList: null,
            cloneRoleList: null,
            requiredOrganization: 0,
            renderPassword: true,
            // Đang thay đổi trạng thái người dùng
            changingStatus: false,
        }
    },

    mounted() {
        this.getRoleList();
        this.initSelect2();
        this.initTable();
        this.handleTableActionEvents();
    },

    methods: {
        formatRepo(item) {
            if (item.label) {
                return $('<p class="text-uppercase text-success">' + item.text + '</p>');
            }
            var address = [];
            if (item.address != undefined) {
                for (var i = 0; i < item.address.length; i++) {
                    address.push(item.address[i].name);
                }

                return $('<p value="' + item.id + '">' + item.text + '<br/><span class="organization-detail">' + address.join(' > ') + '</span></p>');
            } else {
                return '';
            }
        },

        formatRepoSelection(repo) {
            return repo.text;
        },

        initSelect2() {
            // ========================== select role =====================
            $(this.$refs.selectRole).select2({
                width: '100%'
            });

            $(this.$refs.selectRole).val($('#selectRole').find('option:first').val()).trigger("change");

            // =============== select organization =======================
            $(this.$refs.selectOrganization).select2({
                width: '100%',
                ajax: {
                    url: AppCommon.baseUrl + '/admin/organization/listingTree',
                    dataType: 'json',
                    type: 'POST',
                    delay: 250,
                    data: function (params) {
                        let $role;
                        let [$roleSelect] = $("#selectRole").select2('data');
                        console.log("role", $roleSelect);
                        console.log("role", parseInt($roleSelect.id));
                        console.log("role", parseInt($roleSelect.id) === 2);

                        if(parseInt($roleSelect.id) === 11 || parseInt($roleSelect.id) === 7){ //Quan tri cap cao2
                            $role ='branch'
                        }else if(parseInt($roleSelect.id) === 2){ //Quan tri cap cao
                            $role = 'root'
                        }else {
                            $role = 'left'
                        }

                        return {
                            keyword: params.term, // search term
                            role: $role,
                            page: params.page || 1,
                        };
                    },
                    processResults: function (data, params) {
                        vm.listOrganization = data.items;
                        params.page = params.page || 1;
                        // kiem tra xem co thang cap cao nao ko
                        var check = $("#selectRole").select2('data').length > _.filter($("#selectRole").select2('data'), function (o) {
                                return _.indexOf(vm.lowLevelManager, o.element.dataset.name) >= 0;
                            }).length;

                        var returnData = _.forEach(data.items, function (key, value) {
                            if (check == false && key.is_high_level == 1) {
                                key.disabled = true;
                            }
                            return key;
                        });

                        return {
                            results: returnData,
                            pagination: {
                                more: (params.page * 30) < data.total_count
                            }
                        };
                    },
                    cache: true
                },
                placeholder: 'Tìm kiếm tổ chức',
                minimumInputLength: 1,
                templateResult: this.formatRepo,
                templateSelection: this.formatRepoSelection
            });

            // check if not require organization
            $(this.$refs.selectRole).on('change', function () {
                // kiem tra yeu cau chon to chuc khong
                var filterArr = _.filter($("#selectRole").select2('data'), function (o) {
                    return o.element.dataset.organization == 1;
                })

                //neu co yeu cau chon to chuc
                if (filterArr.length > 0) {
                    vm.requiredOrganization = 1;
                    // kiem tra xem co thang cap cao nao ko
                    var check = $("#selectRole").select2('data').length > _.filter($("#selectRole").select2('data'), function (o) {
                            return _.indexOf(vm.lowLevelManager, o.element.dataset.name) >= 0;
                        }).length;
                    // neu k co thi xoa gia tri to chuc hien tai di
                    if (check == false) {
                        $('#selectOrganization').select2("trigger", "select", {
                            data: {id: '', text: ''}
                        });
                    }
                } else {
                    vm.requiredOrganization = 0;
                    // reset select role & select organization
                    $('#selectOrganization').select2("trigger", "select", {
                        data: {id: '', text: ''}
                    });
                }

                if ($(this).val() != '') {
                    vm.$validator.errors.remove('selectRole[]', 'userForm');
                }
            });

            //clear selectOrganization errors
            $(this.$refs.selectOrganization).on('change', function () {
                if($("#selectOrganization").select2('data')[0].id){
                    vm.$validator.errors.remove('selectOrganization', 'userForm');
                }
            });
        },

        initTable() {
            setupDataTableSearch();

            this.userDataTable = $(this.$refs.userTableEl).DataTable(buildDataTableOption({
                ajax: {
                    url: this.userUrl,
                    type: 'POST',
                    dataType: 'json'
                },

                columns: this.userColumns,
                order: [0, 'desc']
            }));

            this.userDataTable.on('order.dt search.dt draw.dt', function () {
                var info = vm.userDataTable.page.info();
                var start = info.start;

                vm.userDataTable.column(0, {
                    search: 'applied',
                    order: 'applied'
                }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + start;
                });

                jQuery('.tooltip.show').remove();
                $('.actions a').tooltip();

            });

            setupDataTableControl();
        },

        /**
         * Xử lý các sự kiện.
         */
        handleTableActionEvents() {
            // handle hide modal
            $('#user-changepass-modal').on("hidden.bs.modal", function () {
                vm.changePasswordAlertMessage = null;
                vm.$validator.errors.clear('changePasswordForm');
                $(vm.$refs.changePasswordForm)[0].reset();
            });

            $('#user-modal').on("hidden.bs.modal", function () {
                // add validate password
                vm.renderPassword = true;

                //reset form errors and inputs

                vm.$validator.errors.clear('userForm');
                $(vm.$refs.userForm)[0].reset();
                $(vm.$refs.selectRole).val('').trigger("change");

                vm.alertMessage = null;
                vm.filterUserStr = '';
                vm.currentUser = null;

                vm.$validator.errors.remove('password', 'userForm');
                vm.$validator.errors.remove('re_password', 'userForm');
            });

            $('#user-modal').on("show.bs.modal", function () {
                vm.$validator.errors.clear('userForm');
            });

            // action delete user
            $(document).on('click', '.action-delete', function () {
                var tr = $(this).closest('tr')
                var data = $(vm.$refs.userTableEl).DataTable().row(tr).data();
                vm.deleteAction(data);
            });

            // action update user
            $(document).on('click', '.action-edit', function () {
                // get row data
                var tr = $(this).closest('tr')
                var data = $(vm.$refs.userTableEl).DataTable().row(tr).data();
                vm.isEdit = true;
                vm.currentUser = data;

                // init list role
                var arrRole = [];
                for (var i = 0; i < data.roles.length; i++) {
                    arrRole.push(data.roles[i].id);
                }
                // fill data
                $(vm.$refs.userForm).deserialize(data);
                $(vm.$refs.selectRole).val(arrRole).trigger("change");
                if (data.organization_id != undefined && data.organization_id != null && data.organization_id != '' && data.organization != null) {
                    $('#selectOrganization').select2("trigger", "select", {
                        data: {id: data.organization_id, text: data.organization.name}
                    });
                    vm.requiredOrganization = 1;
                } else {
                    $('#selectOrganization').select2("trigger", "select", {
                        data: {id: '', text: ''}
                    });
                }

                // remove render password
                vm.renderPassword = false;
                // show modal
                $(vm.$refs.userModal).modal('show');
            });

            // action change pass
            $(document).on('click', '.action-changepass', function () {
                // get row data
                var tr = $(this).closest('tr')
                var data = $(vm.$refs.userTableEl).DataTable().row(tr).data();

                // fill userId
                $(vm.$refs.changePasswordModal).find('input[name="id"]').val(data.id);
                $(vm.$refs.changePasswordModal).find('input[name="new_password"]').val('');
                $(vm.$refs.changePasswordModal).find('input[name="old_password"]').val('');
                $(vm.$refs.changePasswordModal).find('input[name="re_new_password"]').val('');

                $(vm.$refs.changePasswordModal).modal('show');
            });

            // Người dùng click vào switch đổi trạng thái
            $(document).on('click', '.toggle-status', function () {
                // Lấy ra ID bản ghi
                const tr = $(this).closest('tr');
                const data = $(vm.$refs.userTableEl).DataTable().row(tr).data();
                const id = data.id;

                if (vm.changingStatus) {
                    return;
                }

                vm.changingStatus = true;

                // Hiển thị biểu tượng đang xử lý
                $(this).closest('td').html('<span class="m-loader m-loader--brand spinner"></span>');

                changeUserStatusService({ id: id }, function () {
                    appNotify('Đổi trạng thái người dùng thành công!');
                    vm.changingStatus = false;
                    vm.userDataTable.ajax.reload(null, false);
                }, function (error) {
                    vm.changingStatus = false;
                    if (error != null) {
                        vm.alertMessage = error;
                    } else {
                        appNotify('Có lỗi xảy ra, vui lòng thử lại sau!', 'danger');
                    }
                });
            });

            // Người dùng cấu hình xác thực 2 lớp
            $(document).on('click', '.toggle-enable-totp', async function () {
                // Lấy ra ID bản ghi
                const tr = $(this).closest('tr');
                const rowData = $(vm.$refs.userTableEl).DataTable().row(tr).data();
                const id = rowData.id;

                // Hiển thị biểu tượng đang xử lý
                $(this).closest('td').html('<span class="m-loader m-loader--brand spinner"></span>');

                const { data } = await axios.post('/admin/user/config-totp', { id });

                appNotify('Cấu hình xác thực 2 lớp thành công!');
                vm.userDataTable.ajax.reload(null, false);
            });
        },

        deleteAction(item) {
            bootbox.confirm({
                size: 'normal',
                message: 'Bạn có chắc chắn xóa người dùng <b class="text-danger">' + htmlEscapeEntities(item.name) + '</b>?',
                title: 'Thông báo',
                buttons: {
                    cancel: {
                        label: 'Hủy'
                    },
                    confirm: {
                        label: 'Đồng ý',
                        className: 'btn btn-danger'
                    }
                },
                callback: function (action) {
                    if (action) {
                        deleteUserService({id: item.id}, function () {
                            appNotify('Xóa người dùng thành công!');

                            vm.userDataTable.ajax.reload(null, false);
                        }, function (error) {
                            appNotify('Có lỗi xảy ra, vui lòng thử lại sau!', 'danger');
                        });
                    }
                }
            });
        },

        searchUser: _.debounce(function (e) {
            this.userDataTable.search(e.target.value).draw();
        }, 300),

        validateForm(scope) {
            this.$validator.validateAll(scope).then(result => {
                if (result) {
                    if (this.currentUser == null) {
                        vm.handleAddUser();
                    } else {
                        vm.handleUpdateUser();
                    }
                }
            });
        },

        validateChangePasswordForm(scope) {
            this.$validator.validateAll(scope).then(result => {
                if (result) {
                    vm.handleChangePasswordUser();
                }
            });
        },

        getRoleList() {
            listAllRoleService(function (res) {
                vm.roleList = res;
                vm.cloneRoleList = _.cloneDeep(res);
            });
        },

        handleAddUser() {
            var userData = $(this.$refs.userForm).serialize();
            addUserService(userData, function () {
                appNotify('Thêm người dùng thành công!');

                vm.userDataTable.ajax.reload(null, false);
                $(vm.$refs.userModal).modal('hide');
            }, function (error) {
                if (error != null) {
                    vm.alertMessage = error;
                } else {
                    appNotify('Có lỗi xảy ra, vui lòng thử lại sau!', 'danger');
                    $(vm.$refs.userModal).modal('hide');
                }
            });
        },

        handleUpdateUser() {
            var userData = $(this.$refs.userForm).serialize();
            userData += '&id=' + this.currentUser.id;
            updateUserService(userData, function () {
                appNotify('Cập nhật người dùng thành công!');

                vm.userDataTable.ajax.reload(null, false);
                $(vm.$refs.userModal).modal('hide');
            }, function (error) {
                if (error != null) {
                    vm.alertMessage = error;
                } else {
                    appNotify('Có lỗi xảy ra, vui lòng thử lại sau!', 'danger');
                    $(vm.$refs.userModal).modal('hide');
                }
            });
        },

        handleChangePasswordUser() {
            var userData = $(this.$refs.changePasswordForm).serialize();
            changepassUserService(userData, function (data) {
                appNotify('Đổi mật khẩu thành công!');
                $(vm.$refs.changePasswordModal).modal('hide');
            }, function (error) {
                if (error != null) {
                    vm.changePasswordAlertMessage = error;
                } else {
                    appNotify('Có lỗi xảy ra, vui lòng thử lại sau!', 'danger');
                    $(vm.$refs.changePasswordModal).modal('hide');
                }
            });
        }
    },

    watch: {
        filterUserStr(val) {
            var search = _.lowerCase(val);

            _.forEach(this.permissionList, function (item) {
                if (_.lowerCase(item.name).indexOf(search) > -1
                    || _.lowerCase(item.display_name).indexOf(search) > -1) {
                    item.hide = false;
                } else {
                    item.hide = true;
                }
            });
        }
    }
});
