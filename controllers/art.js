const express = require('express');
const router = express.Router();
const art = require('../models/art')
const User = require('../models/users')
const bcrypt = require('bcrypt');



router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.post('/', (req, res) => {
    art.create(req.body, () => {
        res.redirect('/art', {
            art: art,
        });
    });
});

/// comments 
router.post('/:id/comment', (req, res) => {
    art.findById(req.params.id, (err, foundart) => {
        if (err) console.log(err.message)
        foundart.post.push(req.body.post)
        foundart.save()
        res.redirect(`/art/${req.params.id}`)
    })
});

router.get('/', (req, res) => {
    art.find({}, (error, allart) => {
        res.render('index.ejs', {
            art: allart,
            currentUser: req.session.currentUser,

        });
    });
});

router.get('/:id', (req, res) => {
    art.findById(req.params.id, (err, foundart) => {
        res.render('show.ejs', {
            art: foundart,
            currentUser: req.session.currentUser,

        });
    });
});



router.get('/:id/edit', (req, res) => {
    art.findById(req.params.id, (err, foundart) => { //find the 
        res.render(
            'edit.ejs',
            {
                art: foundart,

            }
        );
    });
});

router.put('/:id', (req, res) => {
    //{new: true} tells mongoose to send the updated model into the callback
    art.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
        res.redirect('/art');
    });
});




//

// DELETE
router.delete('/:id', (req, res) => {
    // add delete logic using mongoose
    art.findByIdAndRemove(req.params.id, (err, deleteart) => {
        if (err) {
            console.log(err)
        } else {
            //redirect back to  index
            res.redirect('/art');
        }
    });
});

module.exports = router;