const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      date_created: req.body.postCreated,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Is this needed? or just repeated?
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();

    const manyPosts = posts.get({ plain: true });

    res.render('homepage', { manyPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postid = await Post.findByPk(req.params.id, {});

    
    const post = postid.get({ plain: true });

    res.render('post', { post });

    if (!postid) {
      res.status(404).json({ message: 'Blog Post Not Found' });
      return;
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;