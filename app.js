const express = require('express');
const app = express();
const path = require('path');

const ejsMate = require('ejs-mate');//add npm i ejs-mate
const methodOverride = require('method-override'); //add when I install override to update data

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yeld-camp'//, {
    //userNewUrlParser: true
    //userCreatedIndex: true
   // userUnifiedTopology: true
//}
);
/**
 * Connecting with database
 */
const db = mongoose.connection;
db.on("error", console.error.bind(console, "conection error:"));
db.once("open", ()=>{
    console.log("Database connected!!");
})
//Requesting my modcel
const Campground = require('./models/campground');

/**
 * Config ejs and paths for views
 */

app.engine('ejs', ejsMate);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));//make my req.body not blank!!! really important-- used on post
app.use(methodOverride('_method'));//add override

app.get('/', (req, res)=>{
    res.render('home');
})
/**
 * Making a data 
 */
app.get('/campgrounds', async(req, res)=>{
    const campgrounds = await Campground.find({});
    res.render('campground/index', {campgrounds:campgrounds});
})

app.get('/campgrounds/new', (req,res)=>{
    res.render('campground/new');
})
app.get('/campgrounds/:id', async(req,res)=>{
    const campground = await Campground.findById((req.params.id));
    res.render('campground/show', {campground});
})
app.post('/campgrounds', async(req,res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id/edit', async(req,res)=>{
    const campground = await Campground.findById((req.params.id));
    res.render('campground/edit', {campground});
})
app.put('/campgrounds/:id', async (req, res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
})
app.delete('/campgrounds/:id', async (req, res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(9898, ()=>{
    console.log("Serving on port 9898");
})
