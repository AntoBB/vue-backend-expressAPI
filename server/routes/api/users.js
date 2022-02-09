const express = require('express');
const mongodb = require('mongodb')
require("dotenv").config();
const cors = require('cors');
const router = express.Router();
const jwt = require("jsonwebtoken");

// Get users
router.get('/', async (req, res) => {
    const users = await loadusersCollection();
    res.send(await users.find({}).toArray());
    //res.send('hello users!');
});

// Login user
router.post("/login/", async (req, res) => {
    
    const { username, password } = req.body;
    const user = await findUser(username, password);

    if(user != null){
      const mytoken = jwt.sign(user, process.env.JWT_KEY);
      res.json({
        mytoken,
        user,
      });
    } else {
      res.status(403);
      res.json({
        message: "invalid login information",
      });
    }
  });

//Register New User
router.post('/RegisterUser/', async (req, res) => {
    
  console.log('req.body: ');
  console.log(req.body);
  const { username, password, email } = req.body;
  const _usernameExist = await findExistingUsername(username);
  
  if(_usernameExist != null){
    res.status(402);
      res.json({
        message: "Username exist",
      });
  } else {

  const _emailExist = await findExistingEmail(email)
  if(_emailExist != null){
    res.status(403);
      res.json({
        message: "Email exist",
      });
  }

  if(_usernameExist == null && _emailExist == null){
   const users = await loadusersCollection();
    await users.insertOne({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        createdAt: new Date()
   });
  res.status(200).send();
  }
}
});

 async function loadusersCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('TestProject1').collection('users');
}

async function findUser(myusername, mypassword) {
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  const users = client.db('TestProject1').collection('Users');
  //console.log(await users.findOne({username:myusername, password:mypassword}));
  return users.findOne({username:myusername, password:mypassword});
}

async function findExistingUsername(myusername){
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  const users = client.db('TestProject1').collection('users');
  return users.findOne({username:myusername});
}

async function findExistingEmail(myemail){
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  const users = client.db('TestProject1').collection('users');
  return users.findOne({email:myemail});
}

module.exports = router;