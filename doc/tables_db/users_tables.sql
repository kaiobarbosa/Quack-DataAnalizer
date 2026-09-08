create database quack_db;

use quack_db;

create table enterprises(
id_enterprise char(8) not null primary key unique,
name_enterprise varchar(50) not null,
cnpj_enterprise varchar(18) not null unique,
email_enterprise varchar(100) not null unique,
password_enterprise varchar(255) not null
);

create table departmant(
id_departmant char(8) not null primary key unique,
name_departmant varchar(50) not null,
enterprise_departmant char(8) not null,
foreign key(enterprise_departmant) references enterprises(id_enterprise)
);

create table user_pf (
id_user char (8) not null primary key unique,
name_user varchar (50) not null,
lastname_user varchar(50) not null,
function_user varchar (50) not null,
departmant_user char(8) not null,
enterprise_user char(8) not null,
email_user varchar(100) not null unique,
password_user varchar(255) not null,
foreign key(departmant_user) references departmant(id_departmant),
foreign key(enterprise_user) references enterprises(id_enterprise)
);

INSERT INTO enterprises 
(id_enterprise, name_enterprise, cnpj_enterprise, email_enterprise, password_enterprise) 
VALUES 
("12312312", "teste", "07.689.002/0001-89", "teste@mgial.com", "testeteste");

delete from enterprises where id_enterprise = "12312312";
select * from enterprises;