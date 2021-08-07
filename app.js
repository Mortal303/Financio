//All Module Import
const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const _ = require("lodash");
const https = require("https");
const request = require("request");
const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//connection with mongodb
require("./mongoose/db");
//require schemas
require("./mongoose/schemas");
const {
    Room,
} = require('./mongoose/schemas');
const {
    render
} = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

// Local Login
app.use(session({
    secret: "Our little kaustubh",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//User Schema 
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    rooms: Array,
    history: Array,
    due: Array,
});

//Adding Plugins
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//Object User
const User = new mongoose.model("User", userSchema);

//Authentication
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/dashboard"
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            username: profile.emails[0].value,
            googleId: profile.id,
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

// GET REQS
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/home.html");
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

app.get('/auth/google/dashboard',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/dashboard", function (req, res) {
    res.set('Cache-Control', 'no-store')
    if (req.isAuthenticated()) {
        res.render("dashboard");
    } else {
        res.redirect("/login");
    }
})

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

//POST REQS
app.post("/login", function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect('/dashboard');
            })
        }
    })
})

app.post("/register", function (req, res) {
    User.register({
        username: req.body.username
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect('/dashboard');
            })
        }
    })
});

app.post("/join", function (req, res) {
    var flag = 0;
    var room_name = req.body.room_name_join;
    var person = req.user.username;
    var member = {
        name: person,
        spend: 0
    };
    Room.findOne({
        room_name: room_name,
    }, (err, result) => {
        if (!err) {
            if (result != null) {
                for(var i =0; i < result.members.length; i++){
                    if(person == result.members[i].name){
                        console.log("Already in room");
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0){
                    User.findOne({username:person}, (err , user) => {
                        if(!err){
                            user.rooms.push(room_name);
                            user.save();
                        } else console.log(err);
                    });
                    result.members.push(member);
                    console.log(result);
                    result.save();
                }
                res.redirect("/dashboard");
            }
        } else console.log(err);
    });
});

app.post("/create", function (req, res) {
    var room_name = req.body.room_name_create;
    var name = req.user.username;
    var member = [{
        name: name,
        spend: 0
    }];
    Room.find({
        room_name: room_name
    }, (err, result) => {
        if (!err) {
            if (result == '') {
                const room = new Room({
                    room_name: room_name,
                    members: member,
                    result: null
                });
                User.findOne({username:name}, (err , user) => {
                    if(!err){
                        user.rooms.push(room_name);
                        user.save();
                    } else console.log(err);
                });
                room.save();
                res.redirect("/dashboard");
            } else {
                console.log("Room Exist");
                res.redirect("/dashboard");
            };
        } else console.log(err);
    });
});

//Connect To Port
const Port = process.env.PORT || 3000;

app.listen(Port, function () {
    console.log("server running");
});
