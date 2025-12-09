async function createTablePlayers() {
    const db = require('./db')
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS player(
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE,
            nationality TEXT,
            dob TEXT,
            position TEXT,
            about TEXT,
            matchplayed INT DEFAULT 0,
            goal INT DEFAULT 0,
            assist INT DEFAULT 0,
            card JSON,
            images TEXT[],
            createdAt TIMESTAMP DEFAULT NOW()
        )`);
        
        console.log("✅ player table created");
    } catch (error) {
        console.log(error);
    }
}

module.exports = createTablePlayers;
