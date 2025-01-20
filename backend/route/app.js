const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const signupRoute = require('./signup');
const loginRoute = require('./login');
const homeRoute = require('./home');
const uploadRoute = require('./admin_upload');
const searchRoute = require('./search');
const countPosts = require('./CountPosts');
const postEditRoute = require('./postEdit');
const userControlRoute = require('./user_control');
const authenticateJWT = require('./middleware/authenticateJWT');
const authorizeRole = require('./middleware/authorizeRole');
const fs = require('fs');
const app = express();
require('dotenv').config();

let corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };


app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(path.join(__dirname, '../../frontend/')));

app.use(session({
  secret: 'M-Directory123@',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.post('/signup',signupRoute);
app.post('/login',loginRoute);
app.use('/',homeRoute);
app.use('/',uploadRoute);
app.use('/',searchRoute);
app.use('/',countPosts);
app.use('/',postEditRoute);
app.use('/',userControlRoute);

app.get('/logout', async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to logout');
      } else {
        return res.status(201).json({status:'Success',message:'Logout Success'});
      }
    });
  } else {
    return res.status(201).json({status:'Success',message:'Logout Success'});
  }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});