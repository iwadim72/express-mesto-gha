module.exports = (err, req, res, next) => {
  // Линтер ругается на next, но без него работать не будет :()
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};
