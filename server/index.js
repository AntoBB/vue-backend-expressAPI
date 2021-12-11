const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// nqwabzmb_TESTdb

const welcome = require('./routes/welcome')
const posts = require('./routes/api/posts')
const users = require('./routes/api/users')
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/', welcome)

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
