async function createNewsTable(){
    const db = require('./db');
    try {
       await db.query(`CREATE TABLE IF NOT EXISTS news(
        id SERIAL PRIMARY KEY,
        league TEXT,
        title TEXT UNIQUE,
        content TEXT UNIQUE,
        images TEXT[],
        createdAt TIMESTAMP DEFAULT NOW()

        )`) 
        console.log("✅ news table created")
    } catch (err) {
        console.log(err)
    }
}

module.exports = createNewsTable