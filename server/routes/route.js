const express = require('express');
const cloudinary = require('../utilities/cloudinary');
const upload = require('../utilities/multer');
const db = require('../database/db');
const fs = require('fs');  

const router = express.Router();


router.get('/api/home', async(req, res)=>{
   const [playerData, newsData, highlightData, matchData, last5matchesData, upcomingData] = await Promise.all([
    await db.query('SELECT * FROM player ORDER BY id DESC LIMIT 4'),
    await db.query('SELECT * FROM news ORDER BY id DESC LIMIT 4'),
    await db.query('SELECT * FROM highlight ORDER BY id DESC LIMIT 4'),
    await db.query('SELECT * FROM match  ORDER BY id DESC LIMIT 12'),
    await db.query('SELECT * FROM "match" WHERE date < NOW() LIMIT 5'),
    await db.query(`SELECT * FROM "match" WHERE date >= NOW() AND date <= NOW() + INTERVAL '7 days' ORDER BY date ASC`)
  ])
  const player = playerData.rows;
  const news = newsData.rows
  const highlight = highlightData.rows
  const match = matchData.rows
  const last5matches = last5matchesData.rows
  const upcoming = upcomingData.rows
  res.status(200).json({player, news, highlight, match, last5matches, upcoming})
})
router.post("/api/players", upload.array('images'), async (req, res) => {
  const { name, nationality, dob, position, about, card } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ msg: "At least one image is required" });
  }

  const imagesUrl = [];

  try {
    for (const file of files) {
      // 1. Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      imagesUrl.push(result.secure_url);

      // 2. Delete temporary file
      fs.unlinkSync(file.path);
    }

    // Insert into DB
    await db.query(
      `INSERT INTO player (name, nationality, dob, position, about, images, card)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, nationality, dob, position, about, imagesUrl, card]
    );

    res.status(200).json({ msg: "Player added successfully" });
  } catch (err) {
    console.error(err);

    // Clean up temp files even if error happens
    files.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    res.status(500).json({ error: "Server error" });
  }
});

router.get('/api/players', async(req, res)=>{
  try {
    const players = await db.query('SELECT * FROM player ORDER BY id DESC')
    res.status(200).json(players.rows)
  } catch (err) {
    console.log(err)
    res.status(500).json({msg:"server Error"})
  }
})
router.patch('/api/player/:playerId', async(req, res)=>{
  const {playerId} = req.params
 let {goal, assist, matchplayed, card}= req.body;

  try {
   const result = await db.query('UPDATE player SET goal=$1, assist=$2, matchplayed=$3, card=$4 WHERE id=$5  returning *', [goal, assist, matchplayed, card, playerId])
    if(!result){
      res.status(404).json({msg:"file not found"})
      return
    }
    res.status(200).json({msg:"updated"})
  } catch (err) {
    console.log(err)
    res.status(500).json({msg:"server Error"})
  }
})
router.get('/api/player/:id', async(req, res)=>{
  const {id} = req.params;
  try {
    const player = await db.query('SELECT * FROM player WHERE id=$1', [id])
    res.status(200).json(player.rows[0])
  } catch (err) {
    console.log(err)
    res.status(500).json({msg:"server Error"})
  }
})


router.post('/api/match', upload.single('club_logo'), async (req, res) => {
  const { league, club_name, club_goal, venue, our_goal, date, time } = req.body;
  const file = req.file;
  let result = null;

  try {
    let imageUrl = null;

    if (file) {
      result = await cloudinary.uploader.upload(file.path);
      imageUrl = result.secure_url;

      // Delete temp file after upload
      fs.unlinkSync(file.path);
    }

    const query = `
      INSERT INTO match (league, club_name, club_goal, venue, our_goal, time, date, club_logo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    await db.query(query, [league, club_name, club_goal, venue, our_goal, time, date, imageUrl]);

    return res.status(200).json({ msg: "File uploaded successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// router.get('/api/match', async(req, res)=>{
//   const result = await db.query('SELECT * FROM match')
// })

router.post('/api/coach', upload.single('image'), async (req, res) => {
  const { name, position } = req.body;

  if (!req.file) {
    return res.status(403).json({ msg: "Image is required" });
  }

  try {
    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = result.secure_url;

    // Correct SQL
    const query = 'INSERT INTO coach(name, position, image) VALUES ($1, $2, $3)';
    
    await db.query(query, [name, position, image]);

    res.status(200).json({ msg: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post('/api/highlight', upload.single('video'), async (req, res) => {
  const { league, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "Video file is required" });
  }

  try {
    // Upload video
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    const { secure_url, public_id } = result;

    const query = `
      INSERT INTO highlight (league, description, video, public_id)
      VALUES ($1, $2, $3, $4)
    `;

    await db.query(query, [league, description, secure_url, public_id]);

    res.status(200).json({ msg: "File Uploaded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



router.get('/api/admin', async (req, res)=>{
  const [playerData, newsData, coachData, highlightData, matchData] = await Promise.all([
    await db.query('SELECT * FROM player'),
    await db.query('SELECT * FROM news'),
    await db.query('SELECT * FROM coach'),
    await db.query('SELECT * FROM highlight'),
    await db.query('SELECT * FROM match'),
  ])
  const player = playerData.rows;
  const news = newsData.rows
  const coach = coachData.rows
  const highlight = highlightData.rows
  const match = matchData.rows
  res.status(200).json({player, news, coach, highlight, match})

})

router.post("/api/news", upload.array('images'), async (req, res) => {
  const {title, content, league } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ msg: "At least one image is required" });
  }

  const imagesUrl = [];

  try {
    for (const file of files) {
      // 1. Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      imagesUrl.push(result.secure_url);

      // 2. Delete temporary file
      fs.unlinkSync(file.path);
    }

    // Insert into DB
    await db.query(
      `INSERT INTO news(title, content, league, images)
       VALUES ($1, $2, $3, $4)`,
      [title, content, league, imagesUrl]
    );

    res.status(200).json({ msg: "News added successfully" });
  } catch (err) {
    console.error(err);

    // Clean up temp files even if error happens
    files.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    });

    res.status(500).json({ error: "Server error" });
  }
});

router.delete('/api/player', async(req, res)=>{
  const id = req.body.id
  try {
    const result = await db.query('DELETE FROM player WHERE id=$1', [id])
    if(result.rows.length > 0){
      return res.status(404).json({msg:"file not found"})
    }
    res.status(200).json({msg:"Deleted"})
  } catch (err) {
    res.status(500).json({msg:"Server error"})
  }
})

router.delete('/api/news', async(req, res)=>{
  const id = req.body.id
  try {
    const result = await db.query('DELETE FROM news WHERE id=$1', [id])
    if(result.rows.length > 0){
      return res.status(404).json({msg:"file not found"})
    }
    res.status(200).json({msg:"Deleted"})
  } catch (err) {
    res.status(500).json({msg:"Server error"})
  }
})
router.delete('/api/match', async(req, res)=>{
  const id =req.body.id
  try {
    const result = await db.query('DELETE FROM match WHERE id=$1', [id])
    if(result.rows.length > 0){
      return res.status(404).json({msg:"file not found"})
    }
    res.status(200).json({msg:"Deleted"})
  } catch (err) {
    res.status(500).json({msg:"Server error"})
  }
})

router.patch('/api/match/:id', async(req, res)=>{
  const {id} =req.query
  const {} = req.body;
  try {
    const result = await db.query('DELETE FROM match WHERE id=$1', [id])
    if(result.rows.length > 0){
      return res.status(404).json({msg:"file not found"})
    }
    res.status(200).json({msg:"Deleted"})
  } catch (err) {
    res.status(500).json({msg:"Server error"})
  }
})
router.delete('/api/highlight', async (req, res) => {
  const { id } = req.body;

  try {
    // 1️⃣ Get the public_id first
    const result = await db.query('SELECT public_id FROM highlight WHERE id=$1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "File not found" });
    }

    const { public_id } = result.rows[0];

    // 2️⃣ Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
    } catch (cloudErr) {
      console.error("Cloudinary deletion error:", cloudErr);
      // You may still want to continue deleting from DB even if Cloudinary fails
    }

    // 3️⃣ Delete from DB
    await db.query('DELETE FROM highlight WHERE id=$1', [id]);

    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete('/api/coach', async(req, res)=>{
  const id =req.body.id
  try {
    const result = await db.query('DELETE FROM highlight WHERE id=$1', [id])
    if(result.rows.length > 0){
      return res.status(404).json({msg:"file not found"})
    }
    res.status(200).json({msg:"Deleted"})
  } catch (err) {
    res.status(500).json({msg:"Server error"})
  }
})

router.get('/api/news', async(req, res)=>{
  try {
    const result = await db.query('SELECT * FROM news ORDER BY id DESC')
    res.status(200).json(result.rows)
  } catch (err) {
    console.log(err)
    res.status(500).json({msg:"Server Error"})
  }
})
router.get('/api/news/:id', async (req, res) => {
  const { id } = req.params; // <-- FIXED

  try {
    const result = await db.query('SELECT * FROM news WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "News not found" });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get('/api/coach', async(req, res)=>{
  try {
    const data = await db.query('SELECT * FROM coach')
    res.status(200).json(data.rows)
  } catch (err) {
    console.log(err)
    res.status(500).json({msg:"server error"})
  }
})
router.get('/api/matches', async(req, res)=>{
  try {
    const data = await db.query('SELECT * FROM match ORDER BY id DESC')
    res.status(200).json(data.rows)
  } catch (err) {
    res.status(500).json({msg:"Server error"})
  }
})

router.get('/api/highlight', async(req, res)=>{
  try {
    const data = await db.query('SELECT * FROM highlight ORDER BY id DESC')
    res.status(200).json(data.rows)
  } catch (err) {
    res.status(500).json({msg:"server eorror"})
  }
})
router.get('/api/highlight/:id', async(req, res)=>{
  const {id} = req.params
  try {
    const data = await db.query('SELECT * FROM highlight WHERE id=$1', [id])
    res.status(200).json(data.rows[0])
  } catch (err) {
    res.status(500).json({msg:"server eorror"})
  }
})

router.patch('/api/gaols', async(req, res)=>{
  try {
    const {goal, id, field} = req.body
    const query = `UPDATE match SET ${field}=$1 WHERE id=$2`
    await db.query(query, [goal, id])
    res.status(200).json({msg:"Updated"})
  } catch (err) {
    res.status(500).json({msg: "server error"})
    console.log(err)
  }
})

router.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const data = await db.query(
      'SELECT * FROM login WHERE email = $1 AND password = $2',  // ← Added AND
      [email, password]
    );

    console.log("Rows found:", data.rows.length);

    if (data.rows.length === 0) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // For testing only – don't send password back in real apps
    res.status(200).json({
      msg: "Login successful (test mode)",
      user: data.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
