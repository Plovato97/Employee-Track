DROP DATABASE IF EXISTS employeeTrack_db;
CREATE DATABASE employeeTrack_db;
USE employeeTrack_db;

CREATE TABLE department (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30)
);

CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- values for departments table
INSERT INTO department (name) VALUES
('Engineer'),
('Sales'),
('HR'),
('Legal'),
('Customer Service');

-- values for role table
INSERT INTO role (title, salary, department_id) VALUES
('Lead Engineer', 260000, 1),
('Engineer', 150000, 1),
('Sales Lead', 90000, 2),
('Sales Person', 70000, 2),
('HR', 85000, 3),
('Lawyer', 200000, 4);

-- values for employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Paul', 'Lovato', 1, null),
('Natalee', 'Lovato', 2, 1),
('Ana', 'Scott', 2, 1),
('Ronaldo', 'Timber', 1, null),
('Ty', 'Lap', 2, 4),
('Tim', 'Lake', 3, null),
('Ryan', 'Roads', 4, 6),
('Gary', 'Trent', 4, 6),
('Jim', 'J', 5, null),
('Queen', 'Lap', 6, null);