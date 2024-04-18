export const addSub = "INSERT INTO subs " + 
    "(subname, breadid, meatid, cheeseid, doublemeat, doublecheese, whole) " +
    "VALUES($1, $2, $3, $4, $5, $6, $7) returning subid"

export const addToppingsToSub  = "INSERT INTO subtoppings(subid, toppingid) " + 
    "VALUES ($1, $2)"

export const addFav = "INSERT INTO userfavs(subid, email) VALUES ($1, $2)"

export const getUserFavs = "SELECT subs.subid, subs.subname FROM userfavs" +
    " INNER JOIN subs ON userfavs.subid = subs.subid WHERE email = $1"

export const getSubNut = "SELECT subs.subname, SUM(items.cals) AS totalcals," +
        " SUM(items.carbs) AS totalcarbs," +
        " SUM(items.fat) AS totalfat," +
        " SUM(items.protein) AS totalprotein," +
        " SUM(items.na) AS totalna," +
        " SUM(items.cholesterol) AS totalcholes" +
    " FROM subs" + 
        //need to use a left join in case of no toppings
        " LEFT JOIN subtoppings ON subs.subid = subtoppings.subid" +  
        " INNER JOIN items ON (subtoppings.toppingid = items.itemid" + 
                " OR subs.meatid = items.itemid" + 
                " OR subs.cheeseid = items.itemid" +
                " OR subs.breadid = items.itemid)" +
    " WHERE subs.subid = $1" + 
    " GROUP BY subs.subname" //need group by to get subname

export const deleteFav = "DELETE FROM subs WHERE subid = $1"