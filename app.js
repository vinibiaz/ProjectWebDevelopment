const express = require('express');
const app = express();
const path = require('path');

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
//Requesting my model
const Campground = require('./models/campground');

/**
 * Config ejs and paths for views
 */

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    res.render('home');
})
/**
 * Making a data Hardcoding
 */
app.get('/makecampground', async(req, res)=>{
    const camp = new Campground({title: 'My Backyard', description: "cheap camping!"});
    await camp.save();
    res.send(camp);
})

app.listen(3000, ()=>{
    console.log("Serving on port 3000");
})
