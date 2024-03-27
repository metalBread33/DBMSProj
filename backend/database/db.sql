CREATE DATABASE dbmsProj;

CREATE TABLE Nutrition(
    id SERIAL PRIMARY KEY,
    cals INT,
    carbs REAL,
    fat REAL,
    protein REAL,
    na INT,
    cholesterol INT
);

/*
ask about this table
CREATE TABLE FoodItems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    nutrition_info SERIAL NOT NULL,
    FOREIGN KEY (nutrition_info) REFERENCES Nutrition,
    itemType int NOT NULL,
    whole BOOLEAN, --for breads only, can be null
    bh BOOLEAN, --for meats and cheeses, can be null
); */

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
);

CREATE TABLE User (
    email VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(64),
    isAdmin BOOLEAN,
    password VARCHAR(255)
    --need to think of a way to store favorites. seperate table for subs, each attribute is a key?
);
