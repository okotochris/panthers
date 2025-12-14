async function createLoginDb(){
    const db = require('./db')
    try {
        db.query(`CREATE TABLE IF NOT EXISTS login(
        id SERIAL PRIMARY KEY,
        password TEXT,
        email TEXT UNIQUE
        )`)
        console.log("✅ Login created ")
    } catch (err) {
        console.log(err)
    }
}

module.exports = createLoginDb;