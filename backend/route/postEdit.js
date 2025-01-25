const express = require('express');
const db = require('./database');
const router = express.Router();
const authenticateJWT = require('./middleware/authenticateJWT');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const handleImageUpload = require('./middleware/handleImageUpload');
const authorizeRole = require('./middleware/authorizeRole');

const categoryMap = {
  "pagodas" : 1,
  "restaurants" : 2,
  "hotels" : 3,
  "foods" : 4
}

async function updatePost(post) {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const updates = [];
        const values = [];

        if(post.title) {
            updates.push("title = ?");
            values.push(post.title);
        }
        if(post.description) {
            updates.push("description = ?");
            values.push(post.description);
        }
        if(post.category) {
          const categoryId = categoryMap[post.category.toLowerCase()];
          if (categoryId) {
            updates.push("category_id = ?");
            values.push(categoryId);
          } else {
            throw new Error("Invalid category name");
          }
        }
        if(post.image_path) {
            updates.push("image_path = ?");
            values.push(post.image_path);
        }
        if(post.created_at) {
            const formattedCreatedAt = new Date(post.created_at);
            updates.push("created_at = ?");
            values.push(formattedCreatedAt);
        }
        if(post.location){
            updates.push("location = ?");
            values.push(post.location);
        }
        if(post.link){
            updates.push("link = ?");
            values.push(post.link);
        }

        values.push(post.id);
        const query = `UPDATE places_and_foods SET ${updates.join(', ')} WHERE id = ?`;

        await db.query(query, values);
        await connection.commit();
    } catch (err) {
        console.error(err);
        await connection.rollback();
        throw new Error('Error updating post');
    } finally {
        connection.release();
    }
}

const postSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    title: Joi.string().pattern(/^[a-zA-Z0-9\s]+$/).min(3).max(100).optional(),
    description: Joi.string().pattern(/^[a-zA-Z0-9\s.,]*$/).min(3).max(500).optional(),
    category: Joi.string().alphanum().valid('Foods', 'Hotels', 'Pagodas').optional(),
    image_path: Joi.string().optional(),
    created_at: Joi.date().iso().optional(),
    location: Joi.string().pattern(/^[a-zA-Z0-9\s,-]+$/).min(3).max(40).required(),
    link: Joi.string()
    .pattern(/^https:\/\/www\.google\.com\/maps\/embed\?pb=!1m18!1m12!1m3!.*!3m2!1i1024!2i768!4f13\.1!3m3.*!5m2!1s[A-Za-z]{2}!2s[A-Za-z]{2}$/)
    .allow(null, 'null').optional()
});


router.post('/api/update/post/:id',authenticateJWT,authorizeRole(['Admin']),handleImageUpload, async (req, res) => {
    const { title, description, category, created_at, location, link } = req.body;
    const { id } = req.params;
    
    const file = req.file;

    try {
        const { error } = postSchema.validate({ id, title, description, category, created_at, location, link });
        if(error){
          console.error(error);
          return res.status(400).json({message:"invalid input data",details: error.details});
        }
        
        const post = {
            id: id,
            title: title,
            description: description,
            category: category,
            created_at: created_at,
            image_path: file ? `/images/${category}/${file.filename}` : undefined,
            location: location,
            link: link
        };

        //delete old image
        if (file) {
            const [existingPost] = await db.query('SELECT image_path FROM places_and_foods WHERE id = ?', [id]);
            const oldImagePath = existingPost[0].image_path;

            if (oldImagePath) {
                const oldImageFilePath = path.join(__dirname, oldImagePath);
                if (fs.existsSync(oldImageFilePath)) {
                    await fs.promises.unlink(oldImageFilePath);
                }
            }
        }

        await updatePost(post);

        res.status(200).json({ message: 'Post updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
