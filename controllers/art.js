const express = require('express');
const router = express.Router();
const art = require('../models/art')

router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.post('/', (req, res) => {
    art.create(req.body, () => {
        res.redirect('/art');
    });
});

router.get('/', (req, res) => {
    art.find({}, (error, allart) => {
        res.render('index.ejs', {
            art: allart
        });
    });
});

router.get('/:id', (req, res) => {
    art.findById(req.params.id, (err, foundart) => {
        res.render('show.ejs', {
            art: foundart
        });
    });
});



router.get('/:id/edit', (req, res) => {
    art.findById(req.params.id, (err, foundart) => { //find the 
        res.render(
            'edit.ejs',
            {
                art: foundart //pass in found 
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