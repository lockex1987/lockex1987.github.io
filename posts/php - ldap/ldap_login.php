<?php
// namespace Cttd\Ldap;


class LdapAuthentication
{
	// Các thông tin cấu hình LDAP
	/*
	private $ldapHost = '192.168.101.15';
	private $adminUsername = 'uid=zimbra,cn=admins,cn=zimbra';
	private $adminPassword = 'YgngV0Ydf';
	private $baseDn = 'ou=people,dc=modtest,dc=gov,dc=vn';
	private $discover = 'uid';
	*/

	private $ldapHost = '10.66.25.12';
	private $adminUsername = 'uid=zimbra,cn=admins,cn=zimbra';
	private $adminPassword = 'eMk0TYH_';
	private $baseDn = 'ou=people,dc=ll47,dc=viettel,dc=vn';
	private $discover = 'uid';

	/*
	private $ldapHost = '10.30.152.20';
	private $adminUsername = 'datcom';
	private $adminPassword = 'Vtcc@2018';
	private $baseDn = 'dc=cyberspace,dc=vn';
	private $discover = 'samaccountname';
	*/

	/*
	private $ldapHost = 'cyberspace.vn'; // 10.30.152.21
	private $adminUsername = 'changepassword@cyberspace.vn';
	private $adminPassword = '559aNH7D0kJ3B$JKo';
	private $baseDn = 'ou=People,dc=cyberspace,dc=vn';
	private $discover = 'samaccountname';
	*/

	/**
	 * Kiểm tra xem có thể đăng nhập qua LDAP hay không.
	 * @param $username Người dùng (tên người dùng ở máy)
	 * @param $password Mật khẩu
	 */
	public function loginUseAdmin($username, $password)
	{
		// Kiểm tra xem có thể kết nối đến LDAP server hay không
		$connection = ldap_connect($this->ldapHost);

		if (!$connection) {
			echo 'Không kết nối đến server LDAP' . PHP_EOL;
			return false;
		}

		// Cấu hình LDAP
		// Chú ý phải có cái này thì ldap_search mới chạy được
		ldap_set_option($connection, LDAP_OPT_PROTOCOL_VERSION, 3);
		ldap_set_option($connection, LDAP_OPT_REFERRALS, 0);

		// Đăng nhập LDAP với tài khoản admin
		$bindAdminResult = ldap_bind($connection, $this->adminUsername, $this->adminPassword);
		if (! $bindAdminResult) {
			echo 'Đăng nhập admin thất bại' . PHP_EOL;
			return false;
		}

		// echo 'Đăng nhập admin thành công\n';

		// Có thể thực hiện các thao tác ldap_add, ldap_list, ldap_search,... ở đây
		$filter =  '(' . $this->discover . '=' . $username . ')';
		// echo $filter . PHP_EOL;
		
		$fields = ['*'];
		$searchResult = ldap_search($connection, $this->baseDn, $filter, $fields);
		$info = ldap_get_entries($connection, $searchResult);
		// print_r($info);
		// var_dump($info);

		// Tên người dùng ở LDAP
		// distinguishedname: tương ứng với authenticate của Laravel LDAP
		// $ldapUsername = $info[0]['distinguishedname'][0];
		// $ldapUsername = $info[0]['dn'];
		
		// Dùng hàm này thì không cần biết tên là distinguishedname hay dn
		$first = ldap_first_entry($connection, $searchResult);
		// var_dump($first);
		if ($first == false) {
			echo 'Không tìm thấy người dùng' . PHP_EOL;
			return false;
		}

		$ldapUsername = ldap_get_dn($connection, $first);		
		echo $ldapUsername . PHP_EOL;

		// Kiểm tra xem người dùng và password ở LDAP có hợp lệ hay không
		$bindUserResult = @ldap_bind($connection, $ldapUsername, $password);
		if ($bindUserResult) {
			// Đóng kết nối
			ldap_close($connection);
			echo 'Đăng nhập thành công' . PHP_EOL;
			return true;
		}
		
		// Đóng kết nối
		ldap_close($connection);
		echo 'Đăng nhập thất bại (mật khẩu sai)' . PHP_EOL;
		return false;
	}
	
	/**
	 * Kiểm tra xem có thể đăng nhập qua LDAP hay không.
	 * @param $username Người dùng (tên người dùng ở máy)
	 * @param $password Mật khẩu
	 */
	public function loginUseNormal($username, $password)
	{
		// Kiểm tra xem có thể kết nối đến LDAP server hay không
		$connection = ldap_connect($this->ldapHost);
		if (!$connection) {
			echo 'Không thể kết nối đến server LDAP' . PHP_EOL;
			return false;
		}
		
		// Cấu hình LDAP
		// Chú ý phải có cái này thì ldap_bind mới thành công
		if (ldap_get_option($connection, LDAP_OPT_PROTOCOL_VERSION, $version)) {
			echo 'Sử dụng phương thức phiên bản ' . $version . PHP_EOL;
		} else {
			echo 'Không thể xác định phiên bản của phương thức' . PHP_EOL;
		}
		ldap_set_option($connection, LDAP_OPT_PROTOCOL_VERSION, 3);
		// ldap_set_option($connection, LDAP_OPT_REFERRALS, 0);

		// Kiểm tra xem người dùng và password ở LDAP có hợp lệ hay không
		$ldapUsername = 'uid=' . $username . ',ou=people,dc=modtest,dc=gov,dc=vn';
		echo $ldapUsername . PHP_EOL;
		$bindUserResult = ldap_bind($connection, $ldapUsername, $password);

		if ($bindUserResult) {
			// Đóng kết nối
			ldap_close($connection);
			echo 'Đăng nhập thành công' . PHP_EOL;
			return true;
		}
		
		// Đóng kết nối
		ldap_close($connection);
		echo 'Đăng nhập thất bại' . PHP_EOL;
		return false;
	}
}


// Kiểm tra
$ldap = new LdapAuthentication();

// Test server 192.168.101.15
// $ldap->loginUseAdmin('ttcd123', 'Hanoi@123');

// Test server 10.66.25.12
$ldap->loginUseAdmin('ttcd', 'Hanoi@123');

// Test server 10.30.152.20 hoặc cyberspace.vn
// $ldap->loginUseAdmin('huyennv9', 'Xaynha@21');
// $ldap->loginUseAdmin('huyennv9x', 'Xaynha@21');
// $ldap->loginUseAdmin('huyennv9', 'Xaynha@21x');

// $ldap->loginUseNormal('huyennv9', 'Xaynha@21');
