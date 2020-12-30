<?php
namespace Cttd\Ldap;


class LdapManager
{
	// Các thông tin cấu hình LDAP
	// Khi đổi mật khẩu cần thêm SSL, giao thức là LDAPS, cổng là 636
	private $ldapHost = 'ldaps://cyberspace.vn';
	private $adminUsername = 'changepassword@cyberspace.vn';
	private $adminPassword = '559aNH7D0kJ3B$JKo';
	private $baseDn = 'ou=People,dc=cyberspace,dc=vn';

	/**
	 * Đổi mật khẩu LDAP.
	 * @param $username Người dùng
	 * @param $oldPassword Mật khẩu cũ
	 * @param $newPassword Mật khẩu mới
	 */
	public function changePassword($username, $oldPassword, $newPassword)
	{
		// Hiển thị debug khi lỗi
		// ldap_set_option(null, LDAP_OPT_DEBUG_LEVEL, 7);

		// Kết nối dùng SSL
		ldap_set_option(null, LDAP_OPT_X_TLS_REQUIRE_CERT, LDAP_OPT_X_TLS_NEVER);

		$connection = ldap_connect($this->ldapHost);

		if (! $connection) {
			echo 'Không kết nối được đến server LDAP' . PHP_EOL;
			return false;
		} else {
			// Cấu hình LDAP
			// Chú ý phải có cái này thì ldap_search mới chạy được
			ldap_set_option($connection, LDAP_OPT_PROTOCOL_VERSION, 3);
			ldap_set_option($connection, LDAP_OPT_REFERRALS, 0);

			// Đăng nhập LDAP với tài khoản admin
			$bindAdminResult = ldap_bind($connection, $this->adminUsername, $this->adminPassword);
			$retval;
			if (! $bindAdminResult) {
				echo 'Đăng nhập admin thất bại' . PHP_EOL;
				$retval = false;
			} else {
				$filter = '(samaccountname=' . $username . ')';
				$fields = ['*'];
				$searchResult = ldap_search($connection, $this->baseDn, $filter, $fields);
				$info = ldap_get_entries($connection, $searchResult);

				// Tên người dùng ở LDAP
				$userDn = $info[0]['distinguishedname'][0];

				// Kiểm tra xem người dùng và password ở LDAP có hợp lệ hay không
				$bindUserResult = ldap_bind($connection, $userDn, $oldPassword);

				if ($bindUserResult) {
					$newEntry = [
						'unicodePwd' => iconv('UTF-8', 'UTF-16LE', '"' . $newPassword . '"')
					];

					// Phai bind lai voi tai khoan admin moi co quyen
					ldap_bind($connection, $this->adminUsername, $this->adminPassword);

					$replaceResult = ldap_mod_replace($connection, $userDn, $newEntry);
					if ($replaceResult === false) {
						echo 'Đổi mật khẩu thất bại' . PHP_EOL;
						$retval = false;
					} else {
						echo 'Đổi mật khẩu thành công' . PHP_EOL;
						$retval = true;
					}
				} else {
					echo 'Username hoặc password không đúng' . PHP_EOL;
					$retval = false;
				}
			}

			// Đóng kết nối
			ldap_close($connection);

			return $retval;
		}
	}
}


// Kiểm tra
$ldap = new LdapManager();

$username = 'huyennv9';
$oldPassword = '@21Docker';
$newPassword = '@20Linux';

$ldap->changePassword($username, $oldPassword, $newPassword);
