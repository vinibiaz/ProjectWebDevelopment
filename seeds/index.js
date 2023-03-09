/**
 * Connect to mongoose and connect my models
 */
const descriptors = [
    'Forest',
    'Ancient',
    'Petrified',
    'Roaring',
    'Cascade',
    'Tumbling',
    'Silent',
    'Redwood',
    'Bullfrog',
    'Maple',
    'Misty',
    'Elk',
    'Grizzly',
    'Ocean',
    'Sea',
    'Sky',
    'Dusty',
    'Diamond'
]
const places = [
    'Flats',
    'Village',
    'Canyon',
    'Pond',
    'Group Camp',
    'Horse Camp',
    'Ghost Town',
    'Camp',
    'Dispersed Camp',
    'Backcountry',
    'River',
    'Creek',
    'Creekside',
    'Bay',
    'Spring',
    'Bayshore',
    'Sands',
    'Mule Camp',
    'Hunting Camp',
    'Cliffs',
    'Hollow'
]


const path = require('path');
const mongoose = require('mongoose');

const Campground = require('../models/campground');

//adding cities file
const cities = require('./cities');
//const {places, descriptors} = require('./seedHelpers.js');

mongoose.connect('mongodb://localhost:27017/yeld-camp'//, {
    //userNewUrlParser: true
    //userCreatedIndex: true
   // userUnifiedTopology: true
//}
);
 //Connecting with database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "conection error:"));
db.once("open", ()=>{
    console.log("Database connected!!");
})

const sample = array =>{
    const teste =array[Math.floor(Math.random() * array.lenght)];
}

const data = descriptors[Math.floor(Math.random() * descriptors.length)];
//
// Adding only one (TESTING)
//const seedDB = async() => {
//    await Campground.deleteMany({});//frist I'll delete everything
//    const c = new Campground({title:'purple field'});
//    await c.save();
//}

const seedDB = async() => {
    await Campground.deleteMany({});//first I'll delete everything
    for(let i =0; i <50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const descriptorsData = descriptors[Math.floor(Math.random() * descriptors.length)]
        const placesData = places[Math.floor(Math.random() * places.length)]
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title :`${descriptorsData} ${placesData}`,
            image: 'https://unsplash.com/collection/483251',
            description: 'TESTEEEEEE',
            price
        })
        await camp.save();
    }
}
console.log(data);
seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database closed');
})