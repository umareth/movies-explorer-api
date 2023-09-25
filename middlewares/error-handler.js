const centralErrorHandler = (err, req, res) => {
  // Если у ошибки нет статуса, выставляем 500 Internal Server Error
  const { statusCode = 500, message } = err;

  // Отправляем ответ с соответствующим статусом и сообщением
  res.status(statusCode).json({ error: message });
};

module.exports = centralErrorHandler;
