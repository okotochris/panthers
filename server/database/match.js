async function createMatchTable(){
    const db = require('./db');
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS match(
            id SERIAL PRIMARY KEY,
            league TEXT,
            venue TEXT,
            status TEXT,
            highlightsUrl TEXT,
            club_goal TEXT,
            our_goal TEXT,
            time TEXT,
            club_name TEXT,
            club_logo TEXT,
            date TIMESTAMP,
            created_at TIMESTAMP DEFAULT NOW()

            )`)
        console.log("✅ Match table created")
    } catch (err) {
        console.log(err)
    }
}

module.exports = createMatchTable