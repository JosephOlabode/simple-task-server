const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    fullname: {type: String, unique: true, default: ''},
    email: {type:String, unique: true, required: true},
    password: {type: String, required: true, minLength: 6},
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},
    fbTokens: Array,
    google: {type: String, default: ''},
});

module.exports = mongoose.model('user', userSchema, 'users');
