const colors = require('ansi-colors');

module.exports = {
  request: (req) => {
    console.log([
      req.method,
      req.url,
      colors.red(Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''),
    ].join(' '));
  },
  response: (res, content) => {
    console.log([
      res.statusCode,
      res.statusMessage,
      colors.green(typeof content === 'object' ? JSON.stringify(content) : content),
    ].join(' '));
  },
};
