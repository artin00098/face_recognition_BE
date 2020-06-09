const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cl = (a,b,c)=> console.log(a,b,c);
const app = express();
const knex = require('knex');
const BodyParser = require('body-parser');
const cors = require('cors');
// ========= registering controllers ==============
const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const image = require('./controllers/Image');
const profile = require('./controllers/profile');


const db = knex({
	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'a',
    database : 'faca_detection'
}})

app.use(BodyParser.json());
app.use(cors());




app.get('/',(req,res)=>{
	res.send(database.users);
})

//=============== Sign in =================
app.post('/signin',(req,res)=>{signin.handleSignin(db,bcrypt)(req,res)})

app.post('/register',(req,res)=>{register.handleRegister(db,bcrypt)(req,res)})

// ===== profile for getting the profile of the users ===============
// ===== with /:id instruction we can use req.params.id to reach the id ===============

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>image.handleApi(req,res))
app.listen(3000,()=>{
	console.log('app is running on port 3000');
}) 
