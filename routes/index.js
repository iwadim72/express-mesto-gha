const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res) => {
  res.status(404).send({ message: 'Неверный путь' });
});

module.exports = router;
