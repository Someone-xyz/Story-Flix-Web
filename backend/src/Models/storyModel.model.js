const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    bookCover : {
        type : String
    },
    author : {
        type : String,
        required : [true, 'author is required'],
        trim : true
    },
    title : {
        type : String,
	    required : [true, 'title is required'],
        unique : [true, 'title already exists it must be unique Copyright']
    }, 
    storyDescription : {
        type : String,
	    default : ''
    },
    storyContent : {
        type : String, 
        required : [true, 'story content is required'],
        trim : true,
        unique : [true, 'story content already exists it must be unique Copyright']
    }
}, {timestamps:true})

const storyModel = mongoose.model('Story', storySchema);
module.exports = storyModel;