<?php

namespace App;

use App\Traits\PscTeamTrait;
use App\Traits\SeederCampaignTrait;
use App\Traits\UserAccountTrait;
use App\Traits\UserPermissionTrait;
use App\Traits\UserOrganizationTrait;
use App\Traits\UsersOnlineTrait;
use App\Traits\UserMissionTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    use UserPermissionTrait;
    use UserOrganizationTrait;
    use UserAccountTrait;
    use UserMissionTrait;
    use PscTeamTrait;
    use SeederCampaignTrait;
    use UsersOnlineTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'status', 'phone'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function account()
    {
        return $this->hasMany('App\Models\Account');
    }

    public function users()
    {
        return $this->hasMany(self::class, 'created_by');
    }

    public function proposals()
    {
        return $this->hasMany('App\Models\Proposal', 'user_id');
    }

    public function topics()
    {
        return $this->belongsTo('App\Models\Topic', 'topic_id');
    }

    public function accounts()
    {
        return $this->belongsToMany('App\Models\Account', 'user_fb_account', 'user_id', 'fb_account_id');
    }

    public function roles()
    {
        return $this->belongsToMany('App\Models\Role', 'user_role', 'user_id', 'role_id');
    }

    public function news()
    {
        return $this->hasMany('App\Models\News', 'reviewer_id', 'id');
    }

    public function classifyNews()
    {
        return $this->hasMany('App\Models\News', 'classifier_id', 'id');
    }

    public function sentimentNews()
    {
        return $this->hasMany('App\Models\News', 'sentiment_reviewer_id', 'id');
    }

    public function newsProcess()
    {
        return $this->hasMany('App\Models\NewsProcess', 'reviewer_id', 'id');
    }
}
