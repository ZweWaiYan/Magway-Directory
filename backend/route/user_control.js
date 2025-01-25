const express = require('express');
const db = require('./database');
const authenticateJWT = require('./middleware/authenticateJWT');
const authorizeRole = require('./middleware/authorizeRole');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const xss = require('xss');

router.get('/api/users',authenticateJWT,authorizeRole(['Admin']),async(req, res)=>{
    try{
        const [users] = await db.query('SELECT id, username, email, role From users');
        res.json(users);
        //console.log(users)
    }catch(error){
        res.status(500).json({message:'Internal Server Error'});
        console.log(error);
    }
});

const createSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().min(8).max(50).required(),
    role: Joi.string().valid('Admin', 'Editor', 'User').optional(),
    password: Joi.string().min(6).required()

})

router.post('/api/createUser',authenticateJWT,authorizeRole(['Admin']),async(req,res)=>{
    const  username = xss(req.body.username)
    const email = xss(req.body.email)
    const password = xss(req.body.password)
    const role = xss(req.body.role) 
    
    const { error } = createSchema.validate({username, email, password, role})
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    try{
        const password_hash = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password, role) VALUES (?,?,?,?)';
        const values = [username, email, password_hash, role];
        const [result] = await db.query(query, values);
        res.status(201).json({
            message: 'User created successfully.',
            id: result.insertId,
            username,
            email,
            role
        });
    }catch(error){
        console.log(error); 
    }
});

//edit
const editSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    email: Joi.string().email().min(8).max(50).optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    role: Joi.string().valid('Admin', 'Editor', 'User').optional()
})

router.post('/api/editUser',authenticateJWT,authorizeRole(['Admin']), async(req, res)=>{
    const id = xss(req.body.id);
    const username = xss(req.body.username);
    const email = xss(req.body.email);
    const role = xss(req.body.role);

    const { error } = editSchema.validate({ id, username, email, role });
    if(error){
        console.log(error)
        return res.status(400).json({message : error.details[0].message})
    }
    try{
        const query = 'UPDATE users SET username = ?, email = ?, role = ? where id = ?';
        const values = [username, email, role, id];
        await db.query(query, values);
        res.send('User updated successfully.');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server error.');
    }
})

//delete
router.delete('/api/deleteUser/:id', authenticateJWT, authorizeRole(['Admin']), async(req,res)=>{
    const {id} = req.params;
    const {error} = editSchema.validate({ id });
    console.log(editSchema.validate({ id }));
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    try{
        const query = 'DELETE FROM users WHERE id = ? '
        const values = [id];
        await db.query(query, values);
        res.send('User deleted successfully.');
    }catch(error){
        res.status(500).json({message:"Internal Server Error."});
        console.log(error);
    }

});

//user count
router.get('/api/userStats', async (req, res) => {
    try {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM users) AS totalUsers,
          (SELECT ROUND(((COUNT(*) - (SELECT COUNT(*) FROM users WHERE creation_date < NOW() - INTERVAL 1 MONTH)) / (SELECT COUNT(*) FROM users WHERE creation_date < NOW() - INTERVAL 1 MONTH)) * 100, 2)) AS percentageChange
        FROM users
      `;
  
      const [results] = await db.query(query);
  
      const stats = results[0];
      
      res.json({
        totalUsers: stats.totalUsers,
        percentageChange: stats.percentageChange
      });
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;