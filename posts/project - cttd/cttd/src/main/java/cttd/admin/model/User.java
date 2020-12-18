/*
 * VIETTEL.
 */
package cttd.admin.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	Long id;

	@Column(name = "login_name")
	String loginName;

	@Column(name = "full_name")
	String fullName;

	@Column(name = "password_hash")
	String passwordHash;

	@Column(name = "salt")
	String salt;

	@Column(name = "email")
	String email;

	@Column(name = "phone")
	String phone;

	@Column(name = "avatar")
	String avatar;

	@Column(name = "created_time")
	Date createdTime;
}
