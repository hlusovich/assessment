const colors = require('ansi-colors');
const http = require('http');

module.exports = {
  _tests: [],
  add: function(test) { this._tests.push(test); },
  skip: () => {},
  next: function() { this._executeTest(this._tests.pop()); },
  run: function() {
    this._tests.reverse();
    this.next();
  },
  _formatOutput(value) {
    return typeof value === 'object' ? JSON.stringify(value, null, 2) : typeof value === 'string' ? `"${value}"` : value;
  },
  _executeTest: function(test) {
    if (!test) {
      return;
    }
    console.log('It should', test.should, '...');
    const req = http.request({
      method: test.method,
      hostname: 'localhost',
      port: 8888,
      path: test.path,
      headers: { 'Content-Type': 'application/json' },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          test.run({ statusCode: res.statusCode, data });
          console.log(colors.green('Passes'));
          console.log('');
          this.next();
        } catch (error)  {
          if (error?.code && error?.expected && error?.actual && error?.operator) {
            console.log(colors.red.bold(error.code));
            const expected = colors.green(this._formatOutput(error.expected))
            const actual = colors.red(this._formatOutput(error.actual))
            console.log(`Expected to ${colors.bold(error.operator)}: `, expected);
            console.log('Actual: ', actual);
            console.log('');
          } else {
            console.log(colors.red.bold('Error'));
            console.error(error);
          }
          this.next();
        }
      });
    });
    if (['post', 'put'].includes(test.method)) {
      req.write(JSON.stringify(test.payload));
    }
    req.end();
  }
};
