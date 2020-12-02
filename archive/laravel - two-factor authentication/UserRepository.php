<?php

namespace App\Repositories\Admin;

use App\Models\Organization;
use App\Models\UserRole;
use App\Repositories\BaseRepository;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserRepository extends BaseRepository
{

    public function model()
    {
        return User::class;
    }

    /**
     * Tìm kiếm.
     * @param null $keyword
     * @param bool $counting
     * @param int $limit
     * @param int $offset
     * @param string $orderBy
     * @param string $orderType
     * @return mixed
     */
    public function getList($keyword = null, $counting = false, $limit = 10, $offset = 0, $orderBy = 'name', $orderType = 'asc')
    {
        $query = User::with('organization')
            ->with('roles')
            ->select('id', 'name', 'email', 'phone', 'organization_id', 'status', 'updated_at', 'enable_totp')
            ->where('name', 'LIKE', "%$keyword%")
            ->orWhere('email', 'LIKE', "%$keyword%")
            ->orWhere('phone', 'LIKE', "%$keyword%");

        if ($counting) {
            return $query->count();
        }

        $query->skip($offset)
            ->take($limit);

        if ($orderBy != null && $orderType != null) {
            $query->orderBy($orderBy, $orderType);
        }

        $users = $query->get();
        $arrReturn = $users->map(function ($item, $key) {
            $organization = Organization::find($item->organization_id);
            if ($organization != null) {
                $ancestors = $organization->getAncestorsAndSelf();

                $address = [];
                foreach ($ancestors as $ancestor) {
                    $address[] = $ancestor->name;
                }

                $item->address = count($address) > 0 ? join(' > ', $address) : $item->organization->id;
                return $item;
            } else {
                $item->address = '';
                return $item;
            }
        });
        return $arrReturn;
    }

    /**
     * Thêm mới người dùng.
     * @param $arr
     * @return mixed
     */
    public function store($name, $email, $password, $organization, $role, $phone)
    {
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->phone = $phone;
        $user->organization_id = $organization;

        $user->password = $password;
        $user->status = 0; // trạng thái bằng 0 nghĩa là hoạt động (1 là không hoạt động)
        $user->enable_totp = 1; // có sử dụng xác thực 2 lớp

        
        if ($user->save() == false) {
            return false;
        }
        $user->roles()->attach($role);
        return true;
    }

    /**
     * Cập nhật người dùng.
     * @param $name
     * @param $displayName
     * @param $desc
     * @param $group
     * @return mixed
     * store new permission
     */
    public function edit($id, $name, $status, $email, $organization, $roles, $phone)
    {
        $user = User::find($id);
        if ($user != null) {
            // update user
            $user->name = $name;
            $user->email = $email;
            $user->phone = $phone;
            $user->organization_id = $organization;

            if ($user->save() == false) {
                return false;
            }

            // remove role
            $user->roles()->detach();
            $user->roles()->attach($roles);
            return true;
        }

        return false;
    }

    /**
     * Xóa người dùng.
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        $user = User::find($id);
        if ($user != null) {
            $user->roles()->detach();
            return $user->delete();
        }
        return false;
    }

    /**
     * Đổi mật khẩu.
     * @param $id
     * @param $newPass
     */
    public function changePass($id, $newPass)
    {
        $user = User::find($id);
        if ($user->password == $newPass) {
            return 'Trùng mật khẩu cũ';
        }
        if ($user != null) {
            $user->password = $newPass;
            return $user->save();
        }
        return false;
    }

    /**
     * Chuyển trạng thái người dùng.
     * @param $id ID của người dùng
     */
    public function changeStatus($id)
    {
        $user = User::find($id);
        if ($user != null) {
            $user->status = $user->status == 0 ? 1 : 0;
            return $user->save();
        }
        return false;
    }

    /**
     * Hàm tĩnh lấy mảng user theo id của tổ chức
     * Nếu $is_object = true thì trả về mảng đối tượng
     * Nếu $is_object = false (mặc định) thì trả về mảng user id
     * @author doanpv
     * @param $organization_id
     * @param bool $is_object
     * @return array
     */
    public static function getListUserByOrganizationId($organization_id, $is_object = false)
    {
        $result = User::where(['organization_id' => $organization_id])->get();
        if ($is_object) {
            return $result;
        } else {
            /*$list = [];
            if ($result && count($result) > 0) {
                foreach ($result as $val) {
                    $list[] = $val->id;
                }
            }*/

            $list = $result->map(function ($item) {
                return $item->id;
            })->all();

            return $list;
        }
    }

    public function listTopTopics()
    {
        $topics = null;
        $parentTopic = Auth::user()->topics()
            ->where(function ($query) {
                $query->whereNull('parent_topic_id')
                    ->orWhere('parent_topic_id', 0);
            })->first();

        if ($parentTopic != null) {
            $topics = $parentTopic->childTopics()->orderBy('name', 'asc')->get();
        }
        return $topics;
    }

    public function getListReviewer()
    {
        $orgId = Auth::user()->organization_id;
        return User::where('organization_id', $orgId)
                    ->whereHas('roles', function ($query) {
                        $query->where('name', ROLE_REVIEWER);
                    })->get();
    }

    public function getReviewerReportData($sourceId, $reviewerId, $fromTime, $toTime)
    {
        $fromTime = Carbon::createFromTimestamp(intval($fromTime / 1000))->format('Y-m-d H:i:s');
        $toTime = Carbon::createFromTimestamp(intval($toTime / 1000))->format('Y-m-d H:i:s');
        $organizationId = Auth::user()->organization_id;
        $sourceArr = getNewsSourceType($sourceId);
        $user = User::where('organization_id', $organizationId)
            ->whereHas('roles', function ($query) {
                $query->where('name', ROLE_REVIEWER);
            })
            ->withCount(['classifyNews as topic_news_count' => function ($q) use ($fromTime, $toTime, $sourceArr) {
                $q->whereBetween('process_time', [$fromTime, $toTime])
                    ->whereIn('status', [NEWS_PROCESSING_STATUS, NEWS_COMPLETED_STATUS]);
                if (!empty($sourceArr)) {
                    $q->whereIn('source_id', $sourceArr);
                }
            }])
            ->withCount(['classifyNews as spamerror_news_count' => function ($q) use ($fromTime, $toTime, $sourceArr) {
                $q->whereBetween('process_time', [$fromTime, $toTime])
                    ->whereIn('status', [NEWS_SPAM_STATUS, NEWS_ERROR_STATUS]);
                if (!empty($sourceArr)) {
                    $q->whereIn('source_id', $sourceArr);
                }
            }])
            ->withCount(['sentimentNews' => function ($q) use ($fromTime, $toTime, $sourceArr) {
                $q->whereBetween('sentiment_time', [$fromTime, $toTime]);
                if (!empty($sourceArr)) {
                    $q->whereIn('source_id', $sourceArr);
                }
            }])
            ->with(['classifyNews' => function ($q) use ($fromTime, $toTime, $sourceArr) {
                $q->whereBetween('process_time', [$fromTime, $toTime])
                    ->groupBy('classifier_id')
                    ->select(
                        'classifier_id',
                        DB::raw("max(process_time - assign_time) as max_time"),
                        DB::raw("min(process_time - assign_time) as min_time"),
                        DB::raw("avg(process_time - assign_time) as avg_time")
                    );
                if (!empty($sourceArr)) {
                    $q->whereIn('source_id', $sourceArr);
                }
            }])
            ->withCount(['newsProcess' => function ($q) use ($fromTime, $toTime, $sourceId) {
                $selectText = 'quantity';
                switch ($sourceId) {
                    case NEWS_SOURCE_NEWS: $selectText .= '_news';break;
                    case NEWS_SOURCE_SOCIAL: $selectText .= '_social';break;
                    case NEWS_SOURCE_BLOG: $selectText .= '_blog';break;
                    case NEWS_SOURCE_OTHER: $selectText .= '_other';break;
                    case NEWS_SOURCE_FORUM: $selectText .= '_forum';break;
                }
                $q->whereBetween('created_at', [$fromTime, $toTime])
                    ->whereIn('type', [NEWS_PROSCESS_SYSTEM_ROLLBACK, NEWS_PROSCESS_MANAGER_ROLLBACK])
                    ->select(DB::raw("SUM($selectText)"));
            }]);
        if ($reviewerId) {
            $user->where('id', $reviewerId);
        }
        return $user->get();
    }
}
