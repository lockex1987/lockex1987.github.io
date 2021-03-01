<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Flow;
use Illuminate\Http\Request;

class CheckFlowOfUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userId = $request->session()->get('userId');
        $flowId = $request->input('flowId');
        $record = Flow::find($flowId);
        if ($record->user_id != $userId) {
            abort(403, 'Unauthorized action.');
            return;
        }

        return $next($request);
    }
}
