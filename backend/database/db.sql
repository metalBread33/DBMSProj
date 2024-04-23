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
    subid SERIAL PRIMARY KEY,
    subname VARCHAR(64),
    whole BOOLEAN, 
    breadid INT,
    meatid INT,
    cheeseid INT,
    FOREIGN KEY (breadid) REFERENCES items, 
    FOREIGN KEY (meatid) REFERENCES items,
    FOREIGN KEY (cheeseid) REFERENCES items,
    doublemeat BOOLEAN,
    doublecheese BOOLEAN
); 

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(64),
    admin BOOLEAN,
    password VARCHAR(255),
);

--table used to track what toppings go on a sub
CREATE TABLE subtoppings (
    toppingid INT,
    subid INT,
    PRIMARY KEY (toppingid, subid),
    FOREIGN KEY (toppingid) REFERENCES items(itemid) ON DELETE CASCADE,
    FOREIGN KEY (subid) REFERENCES subs(subid) ON DELETE CASCADE
);

--table used to track users' fav subs are
CREATE TABLE userFavs (
    email VARCHAR(255),
    subid INT,
    PRIMARY KEY (email, subid),
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (subid) REFERENCES subs(subid) ON DELETE CASCADE
);