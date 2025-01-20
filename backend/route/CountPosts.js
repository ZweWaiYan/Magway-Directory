const express = require('express');
const db = require('./database');
const authenticateJWT = require('./middleware/authenticateJWT');
const authorizeRole = require('./middleware/authorizeRole');


const router = express.Router();

router.get('/api/posts/data',authenticateJWT,authorizeRole(['Admin']), async(req, res)=>{
    try{
        const [pagoda_count] = await db.query('SELECT COUNT(*) AS count FROM places_and_foods WHERE category_id = 1');
        const [food_count] = await db.query('SELECT COUNT(*) as count FROM places_and_foods WHERE category_id = 4');
        const [hotel_count] = await db.query('SELECT count(*) as count FROM places_and_foods WHERE category_id = 3');

        res.json({
            pagoda: pagoda_count[0],
            food: food_count[0],
            hotel: hotel_count[0]
        })
    }catch(error){
        console.error("Error occured : ", error)
        res.status(500).json({message:"Server error."})
    }
});

module.exports = router;