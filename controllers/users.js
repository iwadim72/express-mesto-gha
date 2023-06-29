const http2 = require('node:http2');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.searchUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else { res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' }); }
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Передан неккоректный _id пользователя' });
      } else {
        res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

function updateUserInfo(req, res, data) {
  User.findByIdAndUpdate(req.user._id, data, { runValidators: true, context: 'query', new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else { res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' }); }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  updateUserInfo(req, res, { name, about });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  updateUserInfo(req, res, { avatar });
};
