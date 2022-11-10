function mapErrors(err) {
    if(Array.isArray(err)) {
        return err;
    } else if(err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if(typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

function postViewModel(post) { 
    return {
        _id: post._id,
        name: post.name,
        description: post.description,
        ingredients: post.ingredients,
        imageUrl: post.imageUrl,
        category: post.category,
        author: post.author,
        likes: post.likes
    };
}


module.exports = {
    mapErrors,
    postViewModel
};