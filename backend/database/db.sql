CREATE DATABASE dbmsProj;

CREATE TABLE Nutrition(
    id INT PRIMARY KEY,
    cals INT,
    carbs REAL,
    fat REAL,
    protein REAL,
    na INT,
    cholesterol INT
);

CREATE TABLE Breads(
    id INT PRIMARY KEY,
    name VARCHAR(64),
    whole BOOLEAN,
    nutrition_info INT,
    FOREIGN KEY (nutrition_info) REFERENCES Nutrition
);

CREATE TABLE Toppings(
    id INT PRIMARY KEY,
    name VARCHAR(64),
    nutrition_info INT,
    FOREIGN KEY (nutrition_info) REFERENCES Nutrition
);

CREATE TABLE Cheese(
    id INT PRIMARY KEY,
    name VARCHAR(64),
    bh BOOLEAN,
    nutrition_info INT,
    FOREIGN KEY (nutrition_info) REFERENCES Nutrition
);

CREATE TABLE Sub_Kit(
    id INT PRIMARY KEY,
    name VARCHAR(64),
    bh BOOLEAN,
    nutrition_info INT,
    FOREIGN KEY (nutrition_info) REFERENCES Nutrition
)

CREATE TABLE User (
    email VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(64),
    isAdmin BOOLEAN,
    password VARCHAR(255)
)