const express = require('express');
const db = require('./database');
const router = express.Router();
const xss = require('xss');
const Joi = require('joi');
const path = require('path');

router.use(express.static(path.join(__dirname, './images')));

const searchSchema = Joi.object({
    keyword: Joi.string().alphanum().min(1).max(100).required()
});

router.get('/api/search', async (req, res) => {
    const keyword = xss(req.query.keyword);
    const { error } = searchSchema.validate({ keyword: keyword });
    if (error) {
        return res.status(400).json({ error: 'Invalid keyword' });
    }
    try {
        const searchQuery = `
            SELECT pf.title, c.name AS category, pf.id, pf.description, pf.image_path, pf.average_rating
            FROM places_and_foods pf
            JOIN categories c ON pf.category_id = c.id
            WHERE pf.title LIKE ? OR pf.description LIKE ? OR c.name LIKE ?
            ORDER BY pf.title ASC;
        `;
        const searchTerm = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`];
        const [results] = await db.query(searchQuery, searchTerm);
        if(results.length === 0){
            return res.status(404).json({ error: 'No results found' });
        }
        res.json(results);
    } catch (e) {
        console.error('Error searching:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;