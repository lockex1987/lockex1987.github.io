<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\UserRepository;
use App\Http\Requests\Admin\User\ListingUserRequest;
use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Http\Requests\Admin\User\DeleteUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Http\Requests\Admin\User\ChangePassRequest;
use App\Http\Requests\Admin\User\ChangeStatusRequest;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->middleware('auth');
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        return view('admin.user.index');
    }

    /**
     * Tìm kiếm.
     */
    public function listing(ListingUserRequest $request)
    {
        $start = $request->input('start');
        $length = $request->input('length');
        $draw = $request->input('draw');

        $order = $request->input('order');
        $columns = $request->input('columns');

        $num = $order[0]['column'];
        $orderBy = $num == 0 ? 'id' : $columns[$num]['data'];
        $orderType = $order[0]['dir'];

        $search = $request->input('search');
        $keyword = $search['value'];

        $total = $this->userRepository->getList(
            $keyword,
            true
        );

        $data = $this->userRepository->getList(
            $keyword,
            false,
            $length,
            $start,
            $orderBy,
            $orderType
        );

        $arr = [
            'recordsTotal' => $total,
            'data' => $data,
            'draw' => $draw,
            'recordsFiltered' => $total
        ];

        return response()->json($arr);
    }

    /**
     * Xóa.
     */
    public function delete(DeleteUserRequest $request)
    {
        $result = $this->userRepository->delete($request->input('id'));
        return processCommonResponse($result);
    }

    /**
     * Thêm mới.
     */
    public function store(StoreUserRequest $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = Hash::make($request->input('password'));
        $organization = $request->input('selectOrganization');
        $role = $request->input('selectRole');

        $result = $this->userRepository->store($name, $email, $password, $organization, $role, $phone);
        return processCommonResponse($result);
    }

    /**
     * Cập nhật.
     */
    public function edit(UpdateUserRequest $request)
    {
        $id = $request->input('id');
        $name = $request->input('name');
        $phone = $request->input('phone');
        $status = $request->input('status');
        $email = $request->input('email');
        $organization = $request->input('selectOrganization');
        $role = $request->input('selectRole');

        $result = $this->userRepository->edit($id, $name, $status, $email, $organization, $role, $phone);
        return processCommonResponse($result);
    }

    /**
     * Đổi mật khẩu.
     */
    public function changePass(ChangePassRequest $request)
    {
        $result = $this->userRepository->changePass($request->input('id'), Hash::make($request->input('new_password')));
        return processCommonResponse($result, $result);
    }

    /**
     * Đổi trạng thái.
     */
    public function changeStatus(ChangeStatusRequest $request)
    {
        $result = $this->userRepository->changeStatus($request->input('id'));
        return processCommonResponse($result);
    }

    /**
     * Cấu hình xác thực 2 lớp.
     */
    public function configTotp(Request $request)
    {
        $id = $request->id;
        $user = User::find($id);
        $user->enable_totp = $user->enable_totp ? 0 : 1;
        $user->save();
        return processCommonResponse(true);
    }
}
