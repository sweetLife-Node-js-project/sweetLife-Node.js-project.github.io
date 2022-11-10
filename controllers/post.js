const { isUser } = require('../middleware/guards');
const { createPost, getPostById, updatePost, deletePost, like } = require('../services/post');
const { mapErrors, postViewModel } = require('../util/mapper');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Post' })
})

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const post = {
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        author: userId
    };
    try {
        await createPost(post);
        res.redirect('/');
    } catch (err) {
        console.error(err)
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Post', errors, data: post })
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if (req.session.user._id != post.author._id) {
        res.redirect('/login');
    }

    res.render('edit', { title: 'Edit post', post });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = postViewModel(await getPostById(id));

    if (req.session.user._id != existing.author._id) {
        res.redirect('/login');
    }
    const post = {
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
    };
    try {
        await updatePost(id, post);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        post._id = id;
        res.render('edit', { title: 'Edit post', post, errors });
    }

});

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = postViewModel(await getPostById(id));

    if (req.session.user._id != existing.author._id) {
        res.redirect('/login');
    }
    try {
        await deletePost(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('details', { title: existing.title, errors });
    }
});

router.get('/like/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    try {
        await like(id, req.session.user._id);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('details', { title: 'Post Details', errors });
    }
});

module.exports = router;