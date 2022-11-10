const Post = require('../models/Post');

async function createPost(post) {
    const result = new Post(post);
    await result.save(); 
    return result;
}

async function getPosts() {
    return Post.find({});
}

async function getPostsByAuthor(userId) {
    return Post.find({ author: userId });
}

async function getPostById(id) {
    return Post.findById(id).populate('author');
}

async function updatePost(id, post) {
    const existing = await Post.findById(id);
    existing.name = post.name;
    existing.description = post.description;
    existing.ingredients = post.ingredients;
    existing.imageUrl = post.imageUrl;
    existing.category = post.category;

    await existing.save();
}

async function deletePost(id) {
    return Post.findByIdAndDelete(id);
}

async function like(postId, userId) { 
    const post = await Post.findById(postId);
    if(post.likes.includes(userId)) {
        throw new Error('User has already liked');
    }
    post.likes.push(userId);
    await post.save();
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    like,
    getPostsByAuthor
};