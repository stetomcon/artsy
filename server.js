const express = require('express')
const app = express()
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
// CONTROLLERS
const session = require('express-session')
const usersController = require('./controllers/users.js')
const sessionsController = require('./controllers/sessions.js')
const artController = require('./controllers/art.js');
const criticController = require('./controllers/critic.js');
//

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/basiccrud'

// DB SETUP
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'holasenor', //some random string
        resave: false,
        saveUninitialized: false
    })
)
//CONTROLLERS middleware
app.use('/art', artController)
app.use('/critic', criticController)
app.use('/users', usersController)
app.use('/sessions', sessionsController)


// redirect
app.use('/', (req, res) => {
    res.redirect('/art');
})
//


//
app.listen(PORT, (req, res) => console.log('listening on PORT 3000!'))