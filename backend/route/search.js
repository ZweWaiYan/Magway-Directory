const express = require('express');
const db = require('./database');
const router = express.Router();
const xss = require('xss');
const Joi = require('joi');
const path = require('path');
const Fuse = require('fuse.js')

router.use(express.static(path.join(__dirname, './images')));

const searchSchema = Joi.object({
    keyword: Joi.string().pattern(/^[a-zA-Z0-9\s.]*$/).min(1).max(100).required()
});

router.get('/api/search', async (req, res) => {
    const keyword = xss(req.query.keyword);
    const { error } = searchSchema.validate({ keyword: keyword });
    if (error) {
        return res.status(400).json({ error: 'Invalid keyword' });
    }
    try {
        const searchQuery = `
            SELECT pf.title, c.name AS category, pf.id, pf.description, pf.image_path, pf.average_rating, pf.view_count
            FROM places_and_foods pf
            JOIN categories c ON pf.category_id = c.id
            ORDER BY pf.title ASC;
        `;
    
        const [results] = await db.query(searchQuery);
    
        if (results.length === 0) {
            return res.status(404).json({ error: 'No results found' });
        }
    
        const fuse = new Fuse(results, {
            keys: ["title", "description", "category"],
            threshold: 0.7, //(higher = looser)
        });
    
        const filteredResults = fuse.search(keyword).map(result => result.item);
    
        if (filteredResults.length === 0) {
            return res.json([]);
        }
    
        res.json(filteredResults);
    } catch (e) {
        console.error('Error searching:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;