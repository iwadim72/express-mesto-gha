const router = require('express').Router();
const {
  getUsers, createUser, searchUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', searchUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
