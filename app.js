const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

require('./passport/passport-facebook');
require('./passport/passport-google');
const auth = require('./routes/auth');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const db = "mongodb://localhost:27017/SimpleTask";

mongoose.connect(db, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true}, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Connection to mongodb was successful');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/auth', auth);

server.listen(PORT, () => {
    console.log('Server Listening on Port: ' + PORT);
});
