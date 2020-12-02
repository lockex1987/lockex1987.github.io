create database excel_demo;

use excel_demo;

create table lop(
    id int auto_increment,
    name varchar(10),
    primary key (id)
);

create table diem(
    id int auto_increment,
    name varchar(100),
    toan float,
    ly float,
    hoa float,
    id_lop int,
    primary key (id)
)
collate='utf8_general_ci';

alter table diem add foreign key (id_lop) references lop(id);

select * from lop;

delete from lop;

select * from diem;

delete from diem;
