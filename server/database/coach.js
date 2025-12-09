async function createCoachTable(){
    const db = require('./db');
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS coach(
            id SERIAL PRIMARY KEY,
            image TEXT,
            name TEXT,
            position TEXT,
            created_at TIMESTAMP DEFAULT NOW()
            )`)
    console.log("✅ Coach table created")
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = createCoachTable;