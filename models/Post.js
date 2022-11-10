const { Schema, model, Types: {ObjectId} } = require('mongoose');
const User = require('./User') 
// const URL_PATTERN = /^https?:\/\/(.+)$/;

const postSchema = new Schema({
    name: { type: String, minlength: [6, 'Name should be at least 6 characters long'] },
    description: { type: String, minlength: [50, 'Description should be at least 50 characters long'] },
    ingredients: { type: String, maxlength: [200, 'Ingredients should be at max 200 characters long'] },
    imageUrl: {type: String, required: [true, 'You have to upload an image of your recipe']},
    category: { type: String, required: [true, 'Please select a category']},
    author: { type: ObjectId, ref: 'User' },
    likes: { type: [ObjectId], ref: 'User', default: []}
});


const Post = model('Post', postSchema);
module.exports = Post;