async function createHighlightTable(){
    const db = require('./db')
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS highlight(
            id SERIAL PRIMARY KEY,
            category TEXT,
            league TEXT,
            video TEXT,
            description TEXT,
            created_at TIMESTAMP DEFAULT NOW()
            )`)
        console.log("✅ Highlight table created ")
    } catch (err) {
        console.log(err)
    }
}

module.exports = createHighlightTable;