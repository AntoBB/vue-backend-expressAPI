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

// Login users
router.get('/LoginUser/', async (req, res) => {
    
    const myreq = String(req.body.myreg).split('#');
    _username = myreq[0];
    _password = myreq[1];
    const users = await loadusersCollection();

    res.send(await users.findOne({username:_username}));
    res.status(201).send();
    //res.send('hello users!');
    
});

// Login url
router.post('/LoginUrl/', async (req, res) => {
    
    //const myreq = String(req.body.myreg).split('#');
        
    //_username = req.body.myreg[0];
    //_password = req.body.myreg[1];
    
    //const users = await loadusersCollection();

    //res.send(await users.findOne({username:_username}));
    console.log(req);
    res.status(201).send("GNO!");
    //res.send('hello users!');
    
});
router.post("/login/", (req, res) => {
    const USERNAME = "cody";
    const PASSWORD = "123456";
  
    const { username, password } = req.body;
    console.log(req);
    if (username === USERNAME && password === PASSWORD) {
      const user = {
        id: 1,
        name: "cody",
        username: "cody",
      };
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

//Add Post
router.post('/RegisterUser/', async (req, res) => {
    
    const myreq = (req.body.myreg).split('#');
    _email = myreq[0];
    _username = myreq[1];
    _password = myreq[2];

    const users = await loadusersCollection();
    await users.insertOne({
        email: _email,
        username: _username,
        password: _password,
        createdAt: new Date()
    });
    res.status(201).send();
});

 async function loadusersCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('TestProject1').collection('users');
}

module.exports = router;