CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    confirmPassword VARCHAR(45) NOT NULL,
    birth VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    verified TINYINT(0) NOT NULL,
    isAdmin TINYINT(0) NOT NULL
);