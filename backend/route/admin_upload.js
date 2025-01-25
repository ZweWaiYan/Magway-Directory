const fs = require('fs');
const express = require('express');
const db = require('./database');
const util = require('util');
const path = require('path');
const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const xss = require('xss');
const authenticateJWT = require('./middleware/authenticateJWT');
const authorizeRole = require('./middleware/authorizeRole');
const Joi = require('joi');

const router = express.Router();
const unlinkFile = util.promisify(fs.unlink);

const categoryMap = {
    "pagodas" : 1,
    "restaurants" : 2,
    "hotels" : 3,
    "foods" : 4
}

const storage = multer.diskStorage({
    destination:async(req, file, cb)=>{
        const category = req.body.category;
        if(!category || !categoryMap[category.toLowerCase()]){
            return cb(new Error('Invalid Category'));
        }
        const categorypath = path.join(__dirname,`./images/${category}/`);
        try{
            await fs.promises.mkdir(categorypath,{recursive:true});
            cb(null, categorypath);
        }catch(err){
            cb(err);
        }

    },
    filename:(req,file,cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

const filefilter = (req,file,cb)=>{
    const allowedMIMETypes = ['image/jpeg','image/png','image/gif', 'image/webp'];
    const allowedExtensions = ['.jpg','.jpeg','.png','.gif','.webp'];

    const fileExt = path.extname(file.originalname).toLowerCase();
    const isMIMEValid = allowedMIMETypes.includes(file.mimetype);
    const isExtValid = allowedExtensions.includes(fileExt);

    if(isMIMEValid && isExtValid){
        cb(null,true)
    }else{
        cb(new Error('Invalid File type.'))
    }
}

const maps_pattern = /^https:\/\/www\.google\.com\/maps\/embed\?pb=!1m18!1m12!1m3!.*!3m2!1i1024!2i768!4f13\.1!3m3.*!5m2!1s[A-Za-z]{2}!2s[A-Za-z]{2}$/;
const inputSchema = Joi.object({
    title: Joi.string().pattern(/^[a-zA-Z0-9\s,.-]+$/).min(3).max(40).required(),
    description: Joi.string().pattern(/^[a-zA-Z0-9\s,.-]+$/).min(3).required(),
    location: Joi.string().pattern(/^[a-zA-Z0-9\s,-]+$/).min(3).max(40).required(),
    link: Joi.string().pattern(maps_pattern).required(),
})

const upload = multer({
    storage:storage,
    limits:{fileSize:5000000},
    fileFilter:filefilter
}).single('file');

//cleanup file
async function cleanUpFile(filePath) {
    try {
        await unlinkFile(filePath);
    } catch (err) {
        console.error('Failed to clean up file:', filePath, err);
    }
}

router.post('/api/admin/upload', authenticateJWT,authorizeRole(['Admin']), async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).send({ message: 'Multer error: ' + err.message });
            }
            return res.status(400).send({ message: 'Error: ' + err.message });
        }

        if(!req.file){
            return res.status(400).send({message:'No file uploaded.'});
        }

        title = xss(req.body.title);
        description = xss(req.body.description);
        location = xss(req.body.location);
        link = req.body.link;

        const {error} = inputSchema.validate({ title, description, location, link});
        if(error){
            console.log(error)
            return res.status(400).send({message : error.details[0].message})
        }

        try {
            const fileType = await import('file-type');
            const uploadedFilePath = req.file.path;
            const fileBuffer = fs.readFileSync(uploadedFilePath);
            const detectedType = await fileType.fileTypeFromBuffer(fileBuffer);
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

            if (!detectedType || !allowedTypes.includes(detectedType.mime)) {
                await unlinkFile(uploadedFilePath);
                return res.status(400).send({ message: `Invalid File Content. Expected one of: ${allowedTypes.join(', ')}` });
            }

            console.log('User ID: ', req.user.user_id);
            //console.log('Body:', req.body);

            const category = req.body.category;
            const category_id = categoryMap[category.toLowerCase()];
            if (!category_id) {
                return res.status(400).send({ message: 'Invalid Category' });
            }
            const relativeFilePath = `/images/${category}/${path.basename(uploadedFilePath)}`;
            const insertQuery = `
                INSERT INTO places_and_foods 
                (title, category_id, image_path, description, link, location, average_rating, total_votes) 
                VALUES (?, ?, ?, ?, ?, ?, ?,?)
            `;
            const values = [
                req.body.title,
                category_id,        
                relativeFilePath,    
                req.body.description || '', 
                req.body.link,
                req.body.location,
                0,                   
                0                    
            ];
            console.log('Insert query:', insertQuery);

            await db.query(insertQuery, values);
            res.status(200).send({ message: 'Upload Successful' });
        } catch (error) {
            console.error('Error inserting data into the database:', error.message);
            try{
                await cleanUpFile(req.file.path);
            }catch(err){            
                console.error('Error cleaning up file:', req.file.path, err);
            }
            res.status(500).send({ message: 'Internal server error. Please try again later.' });
        }
    });
});


//delete
router.get('/api/admin/delete/:id',authenticateJWT,authorizeRole(['Admin']),async(req,res)=>{
    try{
        const id = req.params.id;

        const [rows] = await db.query('select image_path from places_and_foods where id = ?',[id]);
        if(rows.length === 0){
            return res.status(404).json({message:"image not found"});
        }

        const image_path = rows[0].image_path;


        const del_query = 'delete from places_and_foods where id = ?';
        await db.query(del_query,[id]);

        const absoute_path = path.join(__dirname,image_path);
        console.log(absoute_path);
        fs.unlink(absoute_path,(err)=>{
            if(err){
                console.error(err)
            }
        });
        res.json({message:"image deleted successfully."});
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Error deleting image."});
    }
})

module.exports = router;