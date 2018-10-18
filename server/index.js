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

//Setting up a server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port: ${port}`));
