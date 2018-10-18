//  API FOR POSTS
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET POSTS
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
}); // that means localhost/api/posts because of app.use('/api/posts') in index.js

// ADD POSTS
router.post('/add', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  //status 201 znaczy, ze wszystko poszlo w porzadku, jak i, ze cos zostało stworzone
  res.status(201).send();
});

// DELETE POSTS
router.delete('/:id/delete', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id) // Mongodb ma specjalne Id, dlatego, aby je dostac trzeba stworzyc objectId i wrzucic id z parametrów
  });
  res.status(200).send();
});
// UPDATE POSTS

// function for mlab load posts and use em and use methods on em n shit
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://zyga:zyga93@ds233763.mlab.com:33763/express_api_posts',
    { useNewUrlParser: true }
  );
  return client.db('express_api_posts').collection('posts');
}

module.exports = router;
