const express = require('express');
const mongodb = require('mongodb')

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
    //res.send('hello posts!');
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

module.exports = router;
