const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth.js');

router.get('/', withAuth, async (req, res) => {
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

module.exports = router;
