// Error handler written as per RFC 7807 - https://tools.ietf.org/html/rfc7807
const errorHandler = (err, req, res, next) => {
  res.status(500).send('Something went wrong...');
}

module.exports = errorHandler;