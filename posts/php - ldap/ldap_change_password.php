<?php
namespace Cttd\Ldap;


class LdapManager
{
	// Các thông tin cấu hình LDAP
	// Khi doi mat khau can SSL, protocol la ldaps
	// Cong la 636
	private $ldapHost = 'ldaps://cyberspace.vn';
	private $adminUsername = 'changepassword@cyberspace.vn';
	private $adminPassword = '559aNH7D0kJ3B$JKo';
	private $baseDn = 'ou=People,dc=cyberspace,dc=vn';

	/**
	 * Doi mat khau LDAP.
	 * @param $username Người dùng
	 * @param $oldPassword Mật khẩu cu
	 * @param $newPassword Mật khẩu moi
	 */
	public function changePassword($username, $oldPassword, $newPassword)
	{
		// Hien thi debug khi loi
		//ldap_set_option(null, LDAP_OPT_DEBUG_LEVEL, 7);
		
		// Ket noi den SSL
		ldap_set_option(null, LDAP_OPT_X_TLS_REQUIRE_CERT, LDAP_OPT_X_TLS_NEVER);

		$connection = ldap_connect($this->ldapHost);

		if (! $connection) {
			echo "Khong ket noi duoc den server LDAP \n";
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
				echo "Dang nhap admin that bai \n";
				$retval = false;
			} else {
				$filter = "(samaccountname=$username)";
				$fields = ["*"];
				$searchResult = ldap_search($connection, $this->baseDn, $filter, $fields);
				$info = ldap_get_entries($connection, $searchResult);

				// Tên người dùng ở LDAP
				$userDn = $info[0]["distinguishedname"][0];

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
						echo "Doi mat khau that bai \n";
						$retval = false;
					} else {
						echo "Doi mat khau thanh cong \n";
						$retval = true;
					}
				} else {
					echo "Username hoac password khong dung \n";
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
