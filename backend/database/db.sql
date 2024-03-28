CREATE DATABASE dbmsProj;

CREATE TABLE items (
    itemid INT PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    itemtype int NOT NULL,
    cals INT,
    carbs REAL,
    fat REAL,
    protein REAL,
    na INT,
    cholesterol INT,
    bh BOOLEAN 
);

CREATE TABLE subs (
    subid INT[] PRIMARY KEY,
    subname VARCHAR(64),
    whole BOOLEAN, 
    breadid INT,
    meatid INT,
    cheeseid INT,
    topid INT,
    FOREIGN KEY (breadid) REFERENCES items, 
    FOREIGN KEY (meatid) REFERENCES items,
    FOREIGN KEY (cheeseid) REFERENCES items,
    FOREIGN KEY (topid) REFERENCES items
); 

CREATE TABLE user (
    email VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(64),
    admin BOOLEAN,
    password VARCHAR(255),
    favs INT[],
    FOREIGN KEY (favs) REFERENCES subs
);
