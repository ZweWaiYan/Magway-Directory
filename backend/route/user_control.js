const express = require('express');
const db = require('./database');
const authenticateJWT = require('./middleware/authenticateJWT');
const authorizeRole = require('./middleware/authorizeRole');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const xss = require('xss');
const { format } = require('path');

router.get('/api/users',authenticateJWT,authorizeRole(['Admin']),async(req, res)=>{
    try{
        const [users] = await db.query('SELECT id, username, email, role, is_banned From users');
        res.json(users);
    }catch(error){
        res.status(500).json({message:'Internal Server Error'});
    }
});

const createSchema = Joi.object({
    username:  Joi.string().pattern(/^[a-zA-Z0-9\s.]*$/).min(3).max(50).optional(),
    email: Joi.string().email().min(8).max(50).required(),
    role: Joi.string().valid('Admin', 'Editor', 'User').optional(),
    password: Joi.string().min(6).required()

})

//user create
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
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(404).json({message:"Email already registered."})
        }
        return res.status(500).json({message:'Internal server error'})
    }
});

//edit
const editSchema = Joi.object({
    id: Joi.number().integer().min(0).required(),
    email: Joi.string().email().min(8).max(50).optional(),
    username:  Joi.string().pattern(/^[a-zA-Z0-9\s.]*$/).min(3).max(50).optional(),
    role: Joi.string().valid('Admin', 'Editor', 'User').optional()
})

router.post('/api/editUser',authenticateJWT,authorizeRole(['Admin']), async(req, res)=>{
    const id = req.body.id;
    const username = xss(req.body.username);
    const email = xss(req.body.email);
    const role = xss(req.body.role);
    const { error } = editSchema.validate({ id, username, email, role });
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    if(id === 0 && req.user.user_id != 0){
        return res.status(403).send({message:"You can't edit this user."})
    }
    try{
        const query = 'UPDATE users SET username = ?, email = ?, role = ? where id = ?';
        const values = [username, email, role, id];
        await db.query(query, values);
        res.status(200).json({message:'User updated successfully.'});
    }catch(error){
        res.status(500).send({message:'Internal Server error.'});
    }
})

//delete
router.post('/api/deleteUser', authenticateJWT, authorizeRole(['Admin']), async(req,res)=>{
    const {id} = req.body;
    const {error} = editSchema.validate({ id });
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }

    if(id === 0 && req.user.user_id != 0){
        return res.status(403).json({message:"You can't delete this user."});
    }else if(id === req.user.user_id){
        return res.status(404).json({message:"Why are u trying to delete your own account? 😳"})
    }
    try{
        const query = 'DELETE FROM users WHERE id = ? '
        const values = [id];
        await db.query(query, values);
        res.status(200).json({message:"User deleted successfully."});
    }catch(error){
        res.status(500).json({message:"Internal Server Error."});
    }

});

//user count
router.get('/api/userStats',authenticateJWT,authorizeRole(['Admin']), async (req, res) => {
    try {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM users) AS totalUsers,
          (SELECT ROUND(((COUNT(*) - (SELECT COUNT(*) FROM users WHERE creation_date < NOW())) / (SELECT COUNT(*) FROM users WHERE creation_date < NOW())) * 100, 2)) AS percentageChange
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


router.get('/api/weeklyuserdata',authenticateJWT,authorizeRole(['Admin']), async(req,res)=>{
    try{
        const query = `
            SELECT 
                DATE(creation_date) AS registration_date, 
                COUNT(*) AS total_users
            FROM 
                users
            WHERE 
                DATE(creation_date) BETWEEN DATE_SUB(DATE(CURDATE()), INTERVAL WEEKDAY(CURDATE()) DAY)
                AND DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)
            GROUP BY 
                DATE(creation_date)
            ORDER BY 
                registration_date;
        `;
        const [result] = await db.query(query);
        const dayMapping = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
        const currentWeekData = {};
        dayMapping.forEach(day => currentWeekData[day] = 0);

        result.forEach(row =>{
            const date = new Date(row.registration_date);
            const dayIndex = (date.getDay()+6) % 7;
            const dayName = dayMapping[dayIndex];
            currentWeekData[dayName] = row.total_users;
        });

        const formattedData = Object.entries(currentWeekData).map(([day,count])=> ({ x: day, y: count }));

        res.json(formattedData);

    }catch(error){
        return res.status(500).json({message : 'Internal server error'});
    }
    

});


//ban users
router.post('/api/ban-users',authenticateJWT,authorizeRole(['Admin']), async(req,res)=>{
    try {
        const { id } = req.body;
        const { error } = editSchema.validate({ id });
        if(error){
            return res.status(400).json({message : error.details[0].message});
        }
        if(id === 0 ){
            return res.status(403).json({message:"You can't ban this user."});
        }
        const query = 'UPDATE users SET is_banned = TRUE WHERE id = ?';
        await db.query(query,[id]);
        res.send('User banned successfully.');
    } catch (error) {
        res.status(500).send({ message: 'Error banning user' });
    }
});

//unban users
router.post('/api/unban-users',authenticateJWT,authorizeRole(['Admin']), async(req,res)=>{
    try {
        const { id } = req.body;
        const { error } = editSchema.validate({ id });
        if(error){
            return res.status(400).json({message : error.details[0].message})
        }
        const query = 'UPDATE users SET is_banned = FALSE WHERE id = ?';
        await db.query(query,[id]);
        res.send('User unbanned successfully.')
    } catch (error) {
        res.status(500).send({ message: 'Error banning user' });
    }
})

module.exports = router;