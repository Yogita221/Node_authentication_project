const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

 app.use('/users', userRoutes)
 app.use('/posts', postRoutes)

 app.get("/", (req, res) => {
    res.send("Welcome to the Node Authentication Project!");
});

module.exports = app;
