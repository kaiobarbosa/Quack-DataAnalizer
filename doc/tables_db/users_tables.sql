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
enterprise_departmant varchar(18) not null,
foreign key(enterprise_departmant) references enterprises(cnpj_enterprise)
);

create table user_pf (
id_user char (8) not null primary key unique,
name_user varchar (50) not null,
lastname_user varchar(50) not null,
function_user varchar (50) not null,
departmant_user char(8) not null,
enterprise_user varchar(18) not null,
email_user varchar(100) not null unique,
password_user varchar(255) not null,
state_user varchar(8),
foreign key(departmant_user) references departmant(id_departmant),
foreign key(enterprise_user) references enterprises(cnpj_enterprise)
);

DELIMITER $$
CREATE TRIGGER trg_insert_state_user
BEFORE INSERT ON user_pf
FOR EACH ROW
BEGIN
	SET NEW.state_user = "Pending";
END $$
DELIMITER ;

INSERT INTO user_pf 
(id_user, name_user, lastname_user, function_user, departmant_user,enterprise_user, email_user, password_user) 
VALUES 
("12312312", "Kaio", "Barbosa", "Auxiliar", "CJo7P6vz", "07.689.002/0001-89", "teste@mgial.com", "testeteste");

drop table user_pf;
drop table departmant;
drop table enterprises;

delete from user_pf where id_user = "12312312";

select * from user_pf where state_user = "Pending";
select * from departmant;
select * from enterprises;
select id_departmant, name_departmant from departmant where enterprise_departmant = "07.689.002/0001-89";