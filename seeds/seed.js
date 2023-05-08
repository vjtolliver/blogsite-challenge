const sequelize = require('../config/connection');
const { User, Post, Comments } = require('../models');


const blogUsers = require('./blogUsers.json');
const blogPosts = require('./blogPosts.json');
const blogComm = require('./blogComm.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(blogUsers, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(blogPosts);
  await Comments.bulkCreate(blogComm);


  process.exit(0);
};

seedDatabase();