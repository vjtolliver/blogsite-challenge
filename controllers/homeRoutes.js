const router = require('express').Router();
const { User, Post, Comments } = require('../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        order: [['date_created', 'ASC']],
        include: { model: User },
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', { posts });

    } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/post/:id', async (req, res) => {
    try {
        const onePost = await Post.findByPk({
            include: 
            [{ model: User }, { model: Comment, include: { model: User } }]
        });
        const thePost = onePost.map((post) => post.get({ plain: true}));
    
    res.render('post', { thePost } );

    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
      }
    
      res.render('login');
    });
    
    module.exports = router;