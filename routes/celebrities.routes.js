const { redirect } = require("express/lib/response");
const app = require("../app");
const Celebrities = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


router.get('/', (req,res)=>{
    Celebrities.find()
    .then(allCelebsFromDB=> res.render('./celebrities/celebrities', {allCelebsFromDB}))
    .catch(err => err)

})

router.get('/create', (req,res)=>{
    res.render('./celebrities/new-celebrity')
})

router.post('/create', (req,res)=>{
    const { name, occupation, catchPhrase} = req.body
    Celebrities
        .create({ name, occupation, catchPhrase}) 
        .then(() => res.redirect('/celebrities'))
        .catch(err=> {
            console.log('hubo un error y no pude crear la celebridad', err), 
            res.render('./celebrities/new-celebrity')
        })
})

router.get('/:id/', (req,res)=>{
    Celebrities
        .findById(req.params.id)
        .then(foundCeleb=>res.render('./celebrities/celebrity-details', foundCeleb))
        .catch(()=>res.render('not-found'))

})

router.get('/:id/edit', (req,res)=>{
    Celebrities
        .findById(req.params.id)
        .then(foundCeleb=>res.render('./celebrities/edit-celebrity', foundCeleb))
        .catch(()=>res.render('not-found'))

})

router.post('/:id/', (req,res)=>{
        const { name, occupation, catchPhrase} = req.body
        const { id } = req.params
        Celebrities
        .findByIdAndUpdate(id, { name, occupation, catchPhrase }, {new:true})
        .then(()=>res.redirect('/celebrities'))
        .catch(()=>res.render('not-found'))

})

router.post('/:id/delete', (req,res)=>{
    const { id } = req.params
    Celebrities
    .findByIdAndDelete(id)
    .then(()=>res.redirect('/celebrities'))
    .catch(()=>res.render('not-found'))

})


module.exports = router;