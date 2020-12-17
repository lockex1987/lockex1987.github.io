<?php
// namespace Cttd\Ldap;


class LdapAuthentication
{
	// Các thông tin cấu hình LDAP
	private $ldapHost = '192.168.101.15';
	private $adminUsername = 'uid=zimbra,cn=admins,cn=zimbra';
	private $adminPassword = 'YgngV0Ydf';
	private $baseDn = 'ou=people,dc=modtest,dc=gov,dc=vn';
	private $usernamePostfix = ''; // @cyberspace.vn

	/**
	 * Kiểm tra xem có thể đăng nhập qua LDAP hay không.
	 * @param $username Người dùng (tên người dùng ở máy)
	 * @param $password Mật khẩu
	 */
	public function loginUseAdmin($username, $password)
	{
		// Kiểm tra xem có thể kết nối đến LDAP server hay không
		$connection = ldap_connect($this->ldapHost);

		if (! $connection) {
			echo "Khong ket noi duoc den server LDAP \n";
			return false;
		}

		// Cấu hình LDAP
		// Chú ý phải có cái này thì ldap_search mới chạy được
		ldap_set_option($connection, LDAP_OPT_PROTOCOL_VERSION, 3);
		ldap_set_option($connection, LDAP_OPT_REFERRALS, 0);

		// Đăng nhập LDAP với tài khoản admin
		$bindAdminResult = ldap_bind($connection, $this->adminUsername, $this->adminPassword);
		if (! $bindAdminResult) {
			echo "Dang nhap admin that bai \n";
			return false;
		}

		// echo "Dang nhap admin thanh cong \n";

		// Có thể thực hiện các thao tác ldap_add, ldap_list, ldap_search,... ở đây
		// samaccountname: tương ứng với discover của Laravel LDAP
		// $filter = "(samaccountname=$username)";
		$filter = "(uid=$username)";
		// echo $filter . "\n";
		
		$fields = ["*"];
		$searchResult = ldap_search($connection, $this->baseDn, $filter, $fields);
		$info = ldap_get_entries($connection, $searchResult);
		// print_r($info);
		// var_dump($info);

		// Tên người dùng ở LDAP
		// distinguishedname: tương ứng với authenticate của Laravel LDAP
		// $ldapUsername = $info[0]["distinguishedname"][0];
		// $ldapUsername = $info[0]['dn'];
		
		// Dùng hàm này thì không cần biết tên là distinguishedname hay dn
		$first = ldap_first_entry($connection, $searchResult);
		$ldapUsername = ldap_get_dn($connection, $first);
		
		echo $ldapUsername . "\n";

		// Kiểm tra xem người dùng và password ở LDAP có hợp lệ hay không
		$bindUserResult = ldap_bind($connection, $ldapUsername, $password);
		if ($bindUserResult) {
			// Đóng kết nối
			ldap_close($connection);
			echo "Dang nhap thanh cong \n";
			return true;
		}
		
		// Đóng kết nối
		ldap_close($connection);
		echo "Dang nhap that bai \n";
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
		if (! $connection) {
			echo "Khong ket noi duoc den server LDAP \n";
			return 1;
		}
		
		// Cấu hình LDAP
		// Chú ý phải có cái này thì ldap_bind mới thành công
		if (ldap_get_option($connection, LDAP_OPT_PROTOCOL_VERSION, $version)) {
			echo "Using protocol version $version\n";
		} else {
			echo "Unable to determine protocol version\n";
		}
		ldap_set_option($connection, LDAP_OPT_PROTOCOL_VERSION, 3);
		// ldap_set_option($connection, LDAP_OPT_REFERRALS, 0);

		// Kiểm tra xem người dùng và password ở LDAP có hợp lệ hay không
		$ldapUsername = "uid=$username,ou=people,dc=modtest,dc=gov,dc=vn";
		echo $ldapUsername . "\n";
		$bindUserResult = ldap_bind($connection, $ldapUsername, $password);

		if ($bindUserResult) {
			// Đóng kết nối
			ldap_close($connection);
			echo "Dang nhap thanh cong \n";
			return true;
		}
		
		// Đóng kết nối
		ldap_close($connection);
		echo "Dang nhap that bai \n";
		return false;
	}
}


// Kiểm tra
$ldap = new LdapAuthentication();

$username = 'ttcd123';
$password = 'Hanoi@123';

$ldap->loginUseAdmin($username, $password);
$ldap->loginUseNormal($username, $password);
