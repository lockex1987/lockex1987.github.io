<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use App\Utils\Totp;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */
    use AuthenticatesUsers;

    /**
     * Khởi tạo.
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Ghi đè lại tên trường dùng để đăng nhập.
     * Dùng ở khá nhiều chỗ: validate, response,...
     */
    public function username()
    {
        return 'name';
    }

    /**
     * Ghi đè phương thức login
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            return $this->checkTotp($request)
                    ?: $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Kiểm tra xác thực 2 lớp.
     * Nếu thành công thì không làm gì.
     * Nếu không thành công thì có trả về giá trị, chính là đối tượng Response.
     */
    private function checkTotp(Request $request)
    {
        $user = Auth::user();

        // Nếu người dùng cấu hình không dùng xác thực 2 lớp thì bỏ qua
        if ($user->enable_totp == 0 || $user->enable_totp == null) {
            return null;
        }

        $totp = new Totp();

        // Nếu người dùng chưa có secret key thì
        // sinh ra secret key, lưu lại vào DB
        // và hiển thị cho người dùng
        if (empty($user->totp_secret_key)) {
            // Chuyển trạng thái là chưa đăng nhập
            auth()->logout();

            // Sinh secret key
            $secretKey = $totp->createSecret();

            // Lưu vào DB
            $user->totp_secret_key = $secretKey;
            $user->save();

            // Tạo nội dung đường dẫn
            // Từ đường dẫn này, chúng ta sẽ sinh ra mã QR
            // Các ứng dụng như Google Authenticator sẽ quét mã QR, phân tích đường dẫn và nhập thông tin
            $company = 'TTCD';
            // $holder = 'huyennv9@viettel.com.vn';
            $holder = $user->name;
            // $qrCodeUrl = $totp->getQRCodeUrl($company, $holder, $secretKey);
            $qrCodeUrl = $totp->getQRCodeGoogleUrl($company, $secretKey, $holder);

            return response()->json([
                'code' => 1,
                'secretKey' => $secretKey,
                'qrCodeUrl' => $qrCodeUrl
            ]);
        }

        // Kiểm tra mã người dùng có nhập OTP hay không
        $otpCode = $request->otpCode;
        if (empty($otpCode)) {
            // Chuyển trạng thái là chưa đăng nhập
            auth()->logout();

            return response()->json([
                'code' => 3,
                'message' => 'Vui lòng nhập mã OTP'
            ]);
        }

        // Kiểm tra mã OTP hợp lệ
        $checkOtp = $totp->verifyCode($user->totp_secret_key, $otpCode);
        if (!$checkOtp) {
            // Chuyển trạng thái là chưa đăng nhập
            auth()->logout();

            return response()->json([
                'code' => 2,
                'message' => 'Mã OTP không hợp lệ'
            ]);
        }

        // OTP hợp lệ thì không làm gì
        // Xử lý tiếp theo Laravel
        return null;
    }

    /**
     * Các thông tin để xác thực.
     */
    protected function credentials(Request $request)
    {
        $arr = [
            $this->username() => $request->{$this->username()},
            'password' => $request->password,
            // Người dùng phải ở trạng thái đang hoạt động
            'status' => 0
        ];
        return $arr;
    }

    /**
     * Sau khi đã xác thực người dùng thành công.
     */
    protected function authenticated(Request $request, $user)
    {
        // Lưu session
        $request->session()->put('userId', Auth::id());

        // Chuyển trang
        $path = '/';
        $role = Auth::user()->roles()->first();
        if ($role) {
            $path = $role->default_page;
        }
        return response()->json([
            'code' => 0,
            'intended' => $path
        ]);
    }
}
