CREATE TABLE orders (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    desc VARCHAR(1024) NOT NULL,
    country VARCHAR(45) NOT NULL,
    image VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    height INT NOT NULL,
    width INT NOT NULL,
    _length INT NOT NULL,
    weight INT NOT NULL,
    discount INT,
    discountDesc VARCHAR(512),
    oldPrice INT,
    amountProduct INT NOT NULL,
    imageList VARCHAR(16),
    boxProducts JSON
);