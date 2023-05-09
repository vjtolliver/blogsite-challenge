const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth.js');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: Post,
      },
    });

    if (!userData) {
      res.redirect('/login'); 
      return;
    }

    const dashboard = userData.get({ plain: true });

    res.render('dashboard', { dashboard });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/updatepost/:id', withAuth, async (req, res) => {
    try {
      const userPost = await Post.findByPk(req.session.user_id);
  
      if (!userPost) {
        res.redirect('/login'); 
        return;
      }
  
      const viewPost = userPost.get({ plain: true });
  
      res.render('updatepost', { viewPost });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/", withAuth, async (req, res) => {
    try {
        res.render('createpost', {
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
  })




module.exports = router;
