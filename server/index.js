const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

// api
const posts = require('./routes/api/post');
app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // its true when deploying to a hosting service
  //Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle single page app
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html')); //refering to 'any route at all'
}
//Setting up a server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port: ${port}`));
