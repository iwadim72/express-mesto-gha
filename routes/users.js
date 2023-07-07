const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, searchUserById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', searchUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().email(),
  }),
}), updateAvatar);

module.exports = router;
