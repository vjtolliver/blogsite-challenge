const router = require('express').Router();
const { Post } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        order: [['date_created', 'ASC']]
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', { posts });

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