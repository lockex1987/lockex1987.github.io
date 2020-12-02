<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use App\Cache\CustomRateLimiter;
use Symfony\Component\HttpFoundation\Response;

class CustomThrottleRequests
{
    /**
     * Đối tượng rate limiter.
     *
     * @var \App\Cache\CustomRateLimiter
     */
    protected $limiter;

    /**
     * Khởi tạo, dependency injection đối tượng rate limiter.
     *
     * @param  \App\Cache\CustomRateLimiter  $limiter
     * @return void
     */
    public function __construct(CustomRateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    /**
     * Xử lý các request đến.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  int  $maxAttempts    Số lần thất bại tối đa
     * @param  int  $decayMinutes    Số phút giới hạn
     * @param  int  $blockedMinutes    Số phút khóa
     * @return mixed
     */
    public function handle($request, Closure $next, $maxAttempts, $decayMinutes, $blockedMinutes)
    {
        // Khóa để kiểm tra, lưu vào cache
        $key = $request->fingerprint();

        // Nếu có nhiều request quá thì response lỗi
        // Mã vẫn là 200
        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            $retryAfter = $this->limiter->availableIn($key);
            $content = json_encode([
                'status' => 'failed',
			    'message' => 'Too Many Attempts',
                'retryAfter' => $retryAfter
            ]);
            $response = new Response($content, 200);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        // Thực hiện nghiệp vụ chính
        $response = $next($request);

        // Nếu request được đánh dấu là lỗi thì tăng số lần
        // Ở Controller cần trả về thiết lập $response->header('throttleIt', true) và trả về $response
        if ($response->headers->has('throttleIt')) {
            $this->limiter->hit($key, $decayMinutes * 60, $blockedMinutes * 60);
        }

        return $response;
    }
}
