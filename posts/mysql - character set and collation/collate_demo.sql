-- Liệt kê chi tiết từng cột
show full columns from organizations;

-- Câu lệnh tạo cột
show create table organizations;

-- Sửa collate của cột
alter table organizations modify name varchar(255) not null comment 'Tên cơ quan/tổ chức (nội dung node)' collate utf8mb4_vietnamese_ci;

drop table if exists test_general;
drop table if exists test_vietnamese;
drop table if exists test_bin;
drop table if exists test;

create table if not exists test_general (
	id int not null auto_increment,
	name varchar(255),
	primary key (id)
) character set=utf8mb4 collate=utf8mb4_general_ci;

create table if not exists test_vietnamese (
	id int not null auto_increment,
	name varchar(255),
	primary key (id)
) character set=utf8mb4 collate=utf8mb4_vietnamese_ci;

create table if not exists test_bin (
	id int not null auto_increment,
	name varchar(255),
	primary key (id)
) character set=utf8mb4 collate=utf8mb4_bin;

create table if not exists test (
	id int not null auto_increment,
	name varchar(255),
	primary key (id)
) character set=utf8mb4;


insert into test_general(name) values ('nguyễn anh tuấn');
insert into test_general(name) values ('NGUYỄN ANH TUẤN');
insert into test_general(name) values ('Đạt');
insert into test_general(name) values ('a');
insert into test_general(name) values ('á');
insert into test_general(name) values ('â');

insert into test_vietnamese(name) values ('nguyễn anh tuấn');
insert into test_vietnamese(name) values ('NGUYỄN ANH TUẤN');
insert into test_vietnamese(name) values ('Đạt');
insert into test_vietnamese(name) values ('a');
insert into test_vietnamese(name) values ('á');
insert into test_vietnamese(name) values ('â');

insert into test_bin(name) values ('nguyễn anh tuấn');
insert into test_bin(name) values ('NGUYỄN ANH TUẤN');
insert into test_bin(name) values ('Đạt');
insert into test_bin(name) values ('a');
insert into test_bin(name) values ('á');
insert into test_bin(name) values ('â');

insert into test(name) values ('nguyễn anh tuấn');
insert into test(name) values ('NGUYỄN ANH TUẤN');
insert into test(name) values ('Đạt');
insert into test(name) values ('a');
insert into test(name) values ('á');
insert into test(name) values ('â');

select * from test_general order by name;
select * from test_vietnamese order by name;
select * from test_bin order by name;
select * from test_bin order by name collate utf8mb4_vietnamese_ci;
select * from test order by name;

select * from test_general where name = 'a';
select * from test_general where name collate utf8mb4_bin = 'a';
select * from test_vietnamese where name = 'a';
select * from test_vietnamese where name collate utf8mb4_bin = 'a';
select * from test_bin where name = 'a';
select * from test where name = 'a';
select * from test where name collate utf8mb4_bin = 'a';


select * from test_general where name like '%tuần%';
select * from test_general where name like '%tuấn%';

select * from test_vietnamese where name like '%tuần%';
select * from test_vietnamese where name like '%tuấn%';
select * from test_vietnamese where name like binary '%tuần%';
select * from test_vietnamese where name like binary '%tuấn%';
select * from test_vietnamese where lower(name) like binary '%tuần%';
select * from test_vietnamese where lower(name) like binary '%tuấn%';
select * from test_vietnamese where lower(name) collate utf8mb4_bin like '%tuần%';
select * from test_vietnamese where lower(name) collate utf8mb4_bin like '%tuấn%';

select * from test_bin where name like '%tuần%';
select * from test_bin where name like '%tuấn%';
select * from test_bin where lower(name) like '%tuần%';
select * from test_bin where lower(name) like '%tuấn%';


select * from test where name like '%tuần%';
select * from test where name like '%tuấn%';
select * from test where lower(name) collate utf8mb4_bin like '%tuần%';
select * from test where lower(name) collate utf8mb4_bin like '%tuấn%';
