const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const artController = require('./controllers/art.js');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/basiccrud'

// DB SETUP
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
//CONTROLLERS
app.use('/art', artController)

// redirect
app.use('/', (req, res) => {
    res.redirect('/art');
})


app.listen(PORT, (req, res) => console.log('listening on PORT 3000!'))