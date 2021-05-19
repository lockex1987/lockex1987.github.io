package cttd.admin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;

@Entity
@Table(name = "user_role")
@Data
public class UserRole {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @Column(name = "role_id")
    Long roleId;
    
    @Column(name = "user_id")
    Long userId;
    
    @Transient
    boolean checked;
    
    @Transient
	String loginName;

    @Transient
	String fullName;
}
