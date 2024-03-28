--Inserts Options for breads
INSERT INTO items (itemid, name, itemtype, cals, carbs, fat, protein, na, cholesterol, bh)
VALUES 
    (1, 'White Bread', 4, 470, 92, 5, 16, 1040, 0, FALSE),
    (2, 'Wheat Bread', 4, 440, 71, 6, 24, 490, 0, FALSE),
    (3, 'Italian 5 Grain', 4, 540, 98, 9, 19, 890, 0, FALSE),
    (4, 'Salad (Spinach Base)', 4, 15, 2, 0, 2, 45, 0, FALSE),
    (5, 'Salad (Lettuce Base)', 4, 20, 4, 0, 1, 15, 0, FALSE),
    (6, 'Sun-Dried Tomato Wrap', 4, 270, 0, 0, 0, 0, 0, FALSE),
    (7, 'Spinach Wrap', 4, 270, 0, 0, 0, 0, 0, FALSE),
    (8, 'White Wrap', 4, 270, 0, 0, 0, 0, 0, FALSE),
    (9, 'Whole Wheat Wrap', 4, 250, 0, 0, 0, 0, 0, FALSE);

--Inserts options for condiments
INSERT INTO items (itemid, name, itemtype, cals, carbs, fat, protein, na, cholesterol, bh)
VALUES
    (10, 'Mayonaise', 3, 220, 1, 23, 1, 150, 15, FALSE),
    (11, 'Yellow Mustard', 3, 20, 2, 1, 1, 340, 0, FALSE),
    (12, 'Honey Mustard', 3, 50, 9, 1, 1, 140, 0, FALSE),
    (13, 'Spicy Brown Mustard', 3, 25, 3, 1, 1, 240, 0, FALSE),
    (14, 'Chipotle Gourmaise', 3, 180, 2, 20, 0, 260, 20, TRUE),
    (15, 'Pepperhouse Gourmaise', 3, 160, 4, 16, 0, 260, 10, TRUE),
    (16, 'Sub Dressing', 3, 220, 1, 24, 1, 110, 0, TRUE),
    (17, 'Buffalo Sauce', 3, 15, 3, 0, 0, 640, 0, FALSE),
    (18, 'Ranch', 3, 100, 1, 11, 0, 270, 10, FALSE);

--inserts options for toppings
INSERT INTO items (itemid, name, itemtype, cals, carbs, fat, protein, na, cholesterol, bh)
VALUES
    (20, 'Bannana Peppers', 3, 10, 2, 0, 1, 310, 0, FALSE),
    (21, 'Black Olives', 3, 30, 2, 3, 1, 310, 0, FALSE),
    (22, 'Garlic Pickles', 3, 5, 0, 0, 0, 300, 0, TRUE),
    (23, 'Dill Pickles', 3, 5, 0, 0, 0, 220, 0, FALSE),
    (24, 'Cucumbers', 3, 0, 0, 0, 0, 0, 0, FALSE),
    (25, 'Green Peppers', 3, 5, 1, 0, 0, 0, 0, FALSE),
    (26, 'Jalapeños', 3, 0, 0, 0, 0, 220, 0, FALSE),
    (27, 'Lettuce', 3, 5, 1, 0, 0, 0, 0, FALSE),
    (28, 'Onions', 3, 10, 3, 0, 0, 0, 0, FALSE),
    (29, 'Spinach Base', 3, 15, 2, 0, 2, 45, 0, FALSE),
    (30, 'Tomatoes', 3, 20, 5, 0, 0, 0, 0, FALSE);

--inserts options for extras
INSERT INTO items (itemid, name, itemtype, cals, carbs, fat, protein, na, cholesterol, bh)
VALUES
    (31, 'Avacado', 3, 110, 6, 10, 1, 5, 0, FALSE),
    (32, 'Bacon', 3, 120, 1, 10, 7, 330, 25, FALSE),
    (33, 'Guacamole', 3, 90, 5, 8, 1, 210, 0, FALSE),
    (34, 'Hummus', 3, 90, 3, 7, 2, 100, 0, FALSE),
    (35, 'Double Meat', 3, NULL, NULL, NULL, NULL, NULL, NULL, FALSE),
    (36, 'Double Cheese', 3, NULL, NULL, NULL, NULL, NULL, NULL, FALSE);

--inserts options for cheese
    
--inserts options for boar's head sub kits

--inserts options for publix kits