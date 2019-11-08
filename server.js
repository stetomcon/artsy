const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = 3000;
const artController = require('./controllers/art.js');

// DB SETUP
mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
//CONTROLLERS
app.use('/art', artController)


app.listen(3000, (req, res) => console.log('listening on PORT 3000!'))