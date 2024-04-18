export const allFoodItems = "SELECT * FROM items ORDER BY itemid"

export const oneItem = "SELECT * FROM items WHERE itemid = $1"

export const allBreads = "SELECT * FROM items WHERE itemtype = 4"

export const allToppings = "SELECT * FROM items WHERE itemtype = 3 " + 
    "ORDER BY itemid"

export const allCheese = "SELECT * FROM items WHERE itemtype = 2"

export const allKits = "SELECT * FROM items WHERE itemtype = 1"

export const itemByName = "SELECT * FROM items WHERE name = $1"

export const addItem = "INSERT INTO items " + 
    "(name, cals, carbs, fat, protein, na, cholesterol, itemtype, itemid, bh) " 
    + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"

export const updateItem = "UPDATE items SET name = $1, cals = $2, carbs = $3," + 
    " fat = $4, protein = $5, na = $6, cholesterol = $7, itemtype = $8, " + 
    "bh = $10 WHERE itemid=$9 RETURNING *"

export const deleteItem = "DELETE FROM items WHERE itemid = $1"

export const nextItemId = "SELECT MAX(itemid) FROM items"