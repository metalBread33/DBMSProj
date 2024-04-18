export const getUser = "SELECT * FROM users WHERE email = $1"

export const registerUser = "INSERT INTO users " + 
    "(email, username, password, admin) VALUES($1, $2, $3, FALSE) RETURNING *"

export const getAllUsers = "SELECT * FROM users"

export const deleteUser = "DELETE FROM users WHERE email = $1"