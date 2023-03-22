DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (

    id INT NOT NULL AUTO_INCREMENT,

    namedept VARCHAR(25) NOT NULL, PRIMARY KEY(id)

);

CREATE TABLE role (

    id INT NOT NULL AUTO_INCREMENT,

    Title VARCHAR(25) NOT NULL,

    compensation DECIMAL(12,2) NOT NULL,

    departmentID INT NOT NULL, PRIMARY KEY (id)
    
);

CREATE TABLE employee (

    id INT NOT NULL AUTO_INCREMENT,

    FirstName VARCHAR(25) NOT NULL,

    LastName VARCHAR(25) NOT NULL,

    rolespec INT NOT NULL,

    managerspec INT, PRIMARY KEY (id)

);