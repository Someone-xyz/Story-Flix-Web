const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, 'Please enter a firstname'],
        minlength : [3, 'First Name must be at least 3 characters'],
        maxlength : 20
    },
    lastname : {
        type : String,
        required : [true, 'Please enter a lastname'],
        minlength : [3, 'Lastname must be at least 3 characters'],
        maxlength : 20
    },
    email : {
        type : String,
        required : [true, 'Please enter an email'],
        unique : [true, 'Email already exists'],
        minlength : [5, 'Email must be at least 5 characters'],
        maxlength : 50
    },
    password : {
        type : String,
        required : [true, 'Please enter a password'],
        minlength : [6, 'Password must be at least 6 characters']
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;