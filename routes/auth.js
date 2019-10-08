const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// user defined packages
const User = require('../model/user');
const config = require('../config');

const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('From the api');
});

router.post('/register', (req, res, next) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) =>{
        if(error){
            console.log(error.message);
            res.status(500).send({message: error.message});
        }
        else{
            if(user){
                res.status(401).send({message:"Email already in use"});
                console.log('email in use');
            }
            else{
                User.findOne({username: userData.username}, (err, user) => {
                    if(err){
                        console.log(err.message);
                        res.status(500).send({message: error.message});
                    }
                    else{
                        if(user){
                            res.status(401).send({message: 'Username already in use'});
                        }
                        else{
                            const hashedPassword = bcrypt.hashSync(userData.password, 8);
                            /*new User(userData);*/
                            let validUserCredential = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPassword
                            });
                            validUserCredential.save((error) => {
                                if(error) {
                                    console.log(error);
                                }
                                else{
                                    res.status(200).send({message: 'Registration is Successful'});
                                }
                            })
                        }
                    }
                });
            }
        }
    })

});

router.post('/login', (req, res) => {
    let userData = req.body; //getting the request parameter

    //checking the database first to see if there is a matching email.
    User.findOne({email: userData.email}, (error, userdb) =>{
        if(error){
            console.log(error.message);
            res.status(404).send({message: "User not found"})
        }
        else{
            if(!userdb){
                res.status(401).send({message:'Invalid email and/or password'});
            }
            else{
                if(bcrypt.compareSync(userData.password,userdb.password)){
                    const token = jwt.sign({id: userdb._id}, config.secret,{
                        expiresIn: 1800
                    });
                    res.status(200).send({auth: true, token: token, username: userdb.username, email: userdb.email});
                }
                else{
                    res.status(401).send({message:'Invalid email and/or password'})
                }

            }
        }
    })
});
router.get('/facebook', passport.authenticate('facebook',{
    scope: 'email'
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
    // do the redirection back to the authentication page
    function(req, res) {
        return res.redirect('http://localhost:4200/welcome/?id='+ this.id);
    }
}));

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/google/callback', passport.authenticate('google', {
    // do the redirection back to the authentication page
}));

router.get('/messages');


// helper function
/*function checkIfUsernameExist(userData){
    User.findOne({username: userData.username}, (error, user) => {
        if
    })
}*/
module.exports = router;

/*
function email( user, message){
    User.findOne({email: user.email}, (err, user) => {
        if(user){

        }
    })
}*/

