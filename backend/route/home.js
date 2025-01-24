const express = require('express');
const db = require('./database');
const router = express.Router();
const path = require('path');
const Joi = require('joi');
const xss = require('xss');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const authenticateJWT = require('./middleware/authenticateJWT');
const authorizeRole = require('./middleware/authorizeRole');
const moment = require('moment');


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  
    max: 100,
    message: 'Too many requests from this IP, please try again later'
});

//router.use(limiter);
//router.use('/api/',limiter);

const imageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many image requests, please try again later',
});

router.use('/images/', express.static(path.join(__dirname, 'images'),{
    etag:true,
    maxAge:'1d'
}));

router.get('/api/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const query = `
                    SELECT 
                        p.id, 
                        p.title, 
                        p.image_path, 
                        p.description,
                        p.location,
                        p.average_rating
                    FROM places_and_foods p
                    JOIN categories c ON p.category_id = c.id
                    WHERE c.name = ?
                    ORDER BY p.average_rating DESC
                    LIMIT 5;
                `;
        const [items] = await db.query(query, [category]);
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/api/categories/:categoryName', async (req, res) => {
    const { categoryName } = req.params;

    try {
        const query = `
                    SELECT 
                        p.id, 
                        p.title, 
                        p.image_path, 
                        p.description,
                        p.location,
                        p.average_rating,
                        p.view_count
                    FROM places_and_foods p
                    JOIN categories c ON p.category_id = c.id
                    WHERE c.name = ?
                    ORDER BY p.average_rating DESC;
                `;
        const [items] = await db.query(query, [categoryName]);
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/api/category/:category/:id', async (req, res) => {
    const { category, id } = req.params;
    const userId = req.user?.id || null;

    try {
        const query = `
            SELECT p.id,
                p.title,
                p.image_path, 
                p.description, 
                p.location, 
                p.average_rating, 
                p.total_votes, 
                p.link, 
                p.created_at, 
                p.view_count
            FROM places_and_foods p 
            JOIN categories c ON p.category_id = c.id
            WHERE c.name = ? AND p.id = ?`;
        
        const [details] = await db.query(query, [category, id]);
    
        if (details.length > 0) {
            await db.query(
                `UPDATE places_and_foods SET view_count = view_count + 1 WHERE id = ?`, 
                [id]
            );
    
            res.json(details[0]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
});


router.get('/api/reviews/:place_id',async(req,res)=>{
    const {place_id} = req.params;
    const query = 'select r.rating, r.review, r.created_at, u.username from ratings r join users u on r.user_id = u.id where r.place_id=?';
    try{
        const [reviews] = await db.query(query,[place_id]);
        res.json(reviews)
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

const reviewschema = Joi.object({
    rating:Joi.number().integer().min(1).max(5).required(),
    review:Joi.string().pattern(/^[a-zA-Z0-9\s.,]*$/).min(3).max(500).optional(),
})

router.post('/api/reviews',authenticateJWT,authorizeRole(['Admin', 'User', 'Editor' ]), async (req, res) => {
    const { place_id, rating, review } = req.body;

    if (!place_id || !rating || !review) {
        return res.status(400).json({ error: 'Place ID, rating, and review are required.' });
    }


    const sanitizedReview = xss(review);
    const user_id = req.user.user_id;


    const { error } = reviewschema.validate({ rating, review: sanitizedReview });
    if (error) {
        console.error('Validation error:', error);
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const query = 'INSERT INTO ratings (place_id, user_id, rating, review) VALUES (?, ?, ?, ?)';
        await db.query(query, [place_id, user_id, rating, sanitizedReview]);

        const averageQuery = `
            UPDATE places_and_foods p
            JOIN (
                SELECT 
                    place_id,
                    ROUND(AVG(r.rating), 2) AS avg_rating,
                    COUNT(*) AS total_votes
                FROM ratings r
                WHERE r.place_id = ?
                GROUP BY place_id
            ) AS new_ratings
            ON p.id = new_ratings.place_id
            SET p.average_rating = new_ratings.avg_rating,
                p.total_votes = new_ratings.total_votes
            WHERE p.id = ?;
        `;
        await db.query(averageQuery, [place_id, place_id]);

        return res.json({ success: true, message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to submit review' });
    }
});

//user favorite
router.post('/api/fav', authenticateJWT,authorizeRole(['Admin','User','Editor']),async(req,res)=>{
    const { post_id } = req.body;
    const user_id = req.user.user_id;

    const checkquery = 'SELECT * FROM favorites WHERE user_id=? AND post_id=?';
    const insertquery = 'INSERT INTO favorites (user_id,post_id) VALUES (?,?)';
    const deletequery = 'DELETE FROM favorites WHERE user_id=? AND post_id=?';

    try{
        const [exist] = await db.query(checkquery,[user_id,post_id]);
        if(exist.length>0){
            await db.query(deletequery,[user_id,post_id]);
            return res.json({success:true,message:"Removed from favorites"});
        }else{
            await db.query(insertquery,[user_id,post_id]);
            res.json({success:true,message:"Added to favorites"});
        }
    }catch(err){
        console.error('Error toggling favorite:', err);
        res.status(500).json({message:"Failed to add to favorites"});
    }
});

router.get('/api/fav',authenticateJWT,authorizeRole(['Admin','User', 'Editor']),async(req,res)=>{
    const user_id = req.user.user_id;
    const query = 'SELECT post_id FROM favorites WHERE user_id=?';
    try{
        const [favorites] = await db.query(query,[user_id]);
        res.json(favorites);
    }catch(err){
        console.error('Error fetching favorites:', err);
        res.status(500).json({message:"Failed to fetch favorites"});
    }
});

router.get('/api/posts', authenticateJWT, authorizeRole(['Admin']), async(req,res)=>{
    try{
        const [posts] = await db.query(`
        SELECT 
            p.id,
            p.title,
            p.description,
            p.image_path,
            p.average_rating,
            p.category_id,
            c.name as category_name
        FROM
            places_and_foods p 
        JOIN 
            categories c on p.category_id = c.id 
        ORDER By p.category_id`)
        res.json(posts)
    }catch(error){
        console.error(error);
        res.status(500).json({message:"internal server error."})
    }
});

//top 5 views
router.get('/api/topviews/:category',authenticateJWT,authorizeRole(['Admin']), async (req, res) => {
    const { category } = req.params;

    try {
        const query = `
            SELECT p.id, p.title, p.image_path, p.average_rating, p.view_count
            FROM places_and_foods p
            JOIN categories c ON p.category_id = c.id
            WHERE c.name = ?
            ORDER BY p.view_count DESC
            LIMIT 5;
        `;
        
        const [posts] = await db.query(query, [category]);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;