CREATE DATABASE mydatabase;
use mydatabase;
show databases;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    reputation INT DEFAULT 0,
    join_date DATE NOT NULL,
    profile_info TEXT
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    creation_date DATE NOT NULL,
    closed_date DATE,
    score INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

select * from users;

select * from questions;