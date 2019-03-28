//1
const express = require('express');
const app = express();
const path = require('path');

//3
app.set('view engine', 'hbs');
const hbs = require('hbs');
app.engine('html', require('hbs').__express);

//7
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
//6
/*const contactlist = [
    'Snow White',
    'Sleeping Beauty',
    'Little Red Ridinghood'
]
*/

/*
app.post('/newContact', function(req, res) {
    console.log('Contact submitted');
    var contact = req.body.name; //index.handlebars line 2 name="name"
    contactList.push(contact);
    res.redirect('/');
});
*/


//9 create contacts to mongodb
const mongoose = require("mongoose");
mongoose.connect('mongodb://lovaly:123abc@ds155492.mlab.com:55492/webchat', { useNewParser: true });
var contactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phonenumber: Number,
    email: String,
    username: String,
    address: String,
    zipcode: Number,
    country: String,
    avatar: String
});
var contacts = mongoose.model('contacts', contactSchema);

//10
app.get('/', (req, res) => {
    console.log('app is working')
    contacts.find({}, function(err, x){
        if(err){
            console.log(err);
        }else{
            res.render('index', {y:x});
        
        }
    });
});

//11
app.post('/newContact', function(req, res) {

    upload(req, res, function(){
        console.log('Contact submitted');
        var newContact = new contacts({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            email: req.body.email,
            username: req.body.username,
            address: req.body.address,
            zipcode: req.body.zipcode,
            country: req.body.country,
            avatar: fileName
        });
        contacts.create(newContact, function(err, contacts){
            if(err){
                console.log(err);
            }else{
                console.log('Inserted:' + newContact);
            }
            res.redirect('/');
        });
        Jimp.read('public/uploads/' + fileName, (err, avatar) => {
            if (err) throw err;
            avatar
              .resize(256, 256) // resize
              .quality(60) // set JPEG quality
              //.greyscale() // set greyscale
              .write('public/uploads/' + fileName); // save
          });
    });

});


//5
//for testing without MongoDB
/*
app.get('/', function(req, res){
    res.render('index.handlebars', {contactlist}); //page should be inside '' eg. 'index'
    //res.send('<h1> Hallöchen </h1>');
});
*/

//4
app.get('*', function(req, res){
    res.send('<h1> Landing Page </h1>');
});

//12 Partials
hbs.registerPartials(__dirname + '/views/partials');
//make a folder partials


//13 storage engine
const multer = require('multer');
var fileName ='';

const storager = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb)=>{
        fileName = 'new.' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

//init upload
const upload = multer({
    storage: storager
}).single('avatar');

//update Schema

//update #11

//Jimp JavaScript Image Manipulation Program
var Jimp = require('jimp');
 
// insert the new photo in the code #11

/*
app.get('/contact/delete/:id', (req, res)=> {
    let contactId = req.params.id;
    const query = Contact.findByIdAndDelete({_id: contactId});
    query.exec((err, result) => {
        res.redirect('/index');
    });
});

app.get('/contact/update/:id', (req, res)=> {
    const contactId = req.params.id;
    const query = Contact.findById({_id: contactId});
    query.exec((err, result) => {
        if(err) throw err;
        res.render('contact', {
            mycontact: result
        });
    });
});

app.post('/contact', (req, res)=> {
    const query = Contact.findById({_id: req.body.id});
    query.exec((err, result) => {
        if(err) throw err;
        result.firstname = req.body.firstname;
        result.lastname = req.body.lastname;
        result.phonenumber = req.body.phonenumber;
        result.email = req.body.email;
        result.username = req.body.username;
        result.country = req.body.country;
        result.save(() => {
            res.redirect('/index');
        });
    });
});

*/


app.get('/delete-contact/:contactId', (req, res)=>{
    res.send(req.params.contactId);
});


//2
app.listen(4001, function() {
    console.log('server started on port 4001');
});