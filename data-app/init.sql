DROP USER IF EXISTS 'sanil';
FLUSH PRIVILEGES;

CREATE USER 'sanil' IDENTIFIED WITH mysql_native_password BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'sanil' WITH GRANT OPTION;

CREATE DATABASE ingestion_job_db;
USE ingestion_job_db;

DROP TABLE IF EXISTS data_item;

DROP TABLE IF EXISTS file_data;

CREATE TABLE data_item(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid VARCHAR(100),
    platform VARCHAR(30),
    file_id INT
);

CREATE TABLE file_data(
    id INT PRIMARY KEY AUTO_INCREMENT,
    file_name VARCHAR(30),
    upload_complete BOOLEAN,
    total_records INT
);