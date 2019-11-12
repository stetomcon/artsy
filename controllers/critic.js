const express = require('express');
const router = express.Router();
const critic = require('../models/critic')




router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.post('/critic/', (req, res) => {
    critic.create(req.body, () => {
        res.render('/show', {
            critic: critic
        });
    });
});

router.get('/', (req, res) => {
    critic.find({}, (error, critic) => {
        res.render('index.ejs', {
            critic: critic
        });
    });
});

router.get('/:id', (req, res) => {
    critic.findById(req.params.id, (err, critic) => {
        res.render('show.ejs', {
            critic: critic
        });
    });
});



router.get('/:id/edit', (req, res) => {
    critic.findById(req.params.id, (err, critic) => { //find the 
        res.render(
            'edit.ejs',
            {
                critic: critic //pass in found 
            }
        );
    });
});

router.put('/:id', (req, res) => {
    //{new: true} tells mongoose to send the updated model into the callback
    critic.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
        res.redirect('/art');
    });
});



// DELETE
router.delete('/:id', (req, res) => {
    // add delete logic using mongoose
    critic.findByIdAndRemove(req.params.id, (err, critic) => {
        if (err) {
            console.log(err)
        } else {
            //redirect back to  index
            res.redirect('/art');
        }
    });
});

module.exports = router;