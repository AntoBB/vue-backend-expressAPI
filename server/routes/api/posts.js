const express = require('express');
const mongodb = require('mongodb')

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
    //res.send('hello posts!');
});3

// Get UserPosts
router.post('/getUserPosts/', async (req, res) => {
    const { username } = req.body;
    const userPosts = await findUserPosts(username);
        res.json({
            userPosts
        });
});

// Get UserPostsARRAY
router.post('/getUserPostsArr/', async (req, res) => {
    const { username } = req.body;
    const posts = await loadUserPostsCollection(username);
    //res.send(await posts.find({}).toArray());
    res.send(posts)
});


//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});

 async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('TestProject1').collection('posts');
}
async function loadUserPostsCollection(myusername) {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let UsersCollection = client.db('TestProject1').collection('Users');
    const user = await UsersCollection.findOne({username:myusername});
    let userPostsList = user["posts"];
    let userPostsListtoArr = [];

    for(let i=0; i<userPostsList.length; i++){

    }
    return userPostsList["post_\^"]
}

async function findUserPosts(myusername) {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://dbUserTest:testuser@cluster0.f4mp6.mongodb.net/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const users = client.db('TestProject1').collection('Users');
    //console.log(await users.findOne({username:myusername, password:mypassword}));
    const user = await users.findOne({username:myusername});
    return userPostsList = user["posts"];
    
    //const _userPost = _user.find(posts)
    //console.log(_user)
    //console.log(typeof(_user))
  }

module.exports = router;
