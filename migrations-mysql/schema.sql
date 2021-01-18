SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
DROP DATABASE IF EXISTS employee_manager;
CREATE DATABASE employee_manager;
USE employee_manager;

-- CREATE TABLES --
CREATE TABLE employee(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int(11) NOT NULL,
  manager_id int(11) DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title varchar(30) NOT NULL,
  salary decimal(10,0) NOT NULL,
  department_id int(11) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);