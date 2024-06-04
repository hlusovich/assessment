const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const log = require('./modules/log.module.js');

const app = express();
const port = 8888;

app.use(bodyParser.json());

function respond(res, statusCode, content) {
  res.status(statusCode)[typeof content === 'object' ? 'json' : 'send'](content);
  log.response(res, content);
}

async function getUsers() {
  try {
    const data = await fs.readFile('./api/data/db/db.json', 'utf8');
    return JSON.parse(data)?.users || [];
  } catch (err) {
    console.error('Error reading file:', err);
    return;
  }
};

async function writeData(users) {
  try {
    await fs.writeFile('./api/data/db/db.json', JSON.stringify({ users }, null, 2), { encoding: 'utf8', flag: 'w' });
  } catch (err) {
    console.error('Error writing file:', err);
    return 0;
  }
  return 1;
}

function modifyUser(user, body, res) {
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== 'string') {
      respond(res, 400, `Value for ${key} must be a string. '${value}' was sent.`);
      return 0;
    }
    if (value.length > 64) {
      respond(res, 400, `Value for ${key} must be less than 64 characters. '${value.slice(0, 64)}...' was sent.`);
      return 0;
    }
    if (value.length < 2) {
      respond(res, 400, `Value for ${key} must be greater than 2 characters. '${value}' was sent.`);
      return 0;
    }
    switch (key) {
      case 'name':
        user.name = value;
        break;
      case 'email':
        user.email = value;
        break;
      case 'role':
        if (!['admin', 'developer', 'user'].includes(value)) {
          respond(res, 400, `Value for ${key} must be a valid option. '${value}' was sent, expecting 'admin', 'developer', or 'user'.`);
          return 0;
        }
        user.role = value;
        break;
      case 'status':
        if (!['active', 'deactivated'].includes(value)) {
          respond(res, 400, `Value for ${key} must be a valid option. '${value}' was sent, expecting 'active', or 'deactivated'.`);
          return 0;
        }
        user.status = value;
        break;
      default:
        respond(res, 400, `Invalid property: '${key}'.`);
        return 0;
    }
  }
  return 1;
}

app.get('/api/users', async (req, res) => {
  log.request(req);
  const users = await getUsers();
  setTimeout(() => respond(res, 200, users), 1000);
});

app.get('/api/users/:id', async (req, res) => {
  log.request(req);
  const users = await getUsers();
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    respond(res, 404, 'User not found');
    return;
  }
  setTimeout(() => respond(res, 200, user), 1000);
});

app.post('/api/users', async (req, res) => {
  log.request(req);
  if (JSON.stringify(Object.keys(req.body).sort()) !== '["email","name","role","status"]') {
    respond(res, 400, 'Invalid input: expecting exactly 4 properties, \'email\', \'name\', \'role\', and \'status\'');
    return;
  }
  const users = await getUsers();
  const user = { id: Date.now().toString(16) };
  if (!modifyUser(user, req.body, res)) {
    return;
  }
  users.push(user);
  const result = await writeData(users);
  setTimeout(() => respond(res, result ? 201 : 417, { created: result }), 1000);
});

app.put('/api/users/:id', async (req, res) => {
  log.request(req);
  const users = await getUsers();
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    respond(res, 404, 'User not found');
    return;
  }
  if (!modifyUser(user, req.body, res)) {
    return;
  }
  const result = await writeData(users);
  setTimeout(() => {
    respond(res, result ? 201 : 417, { modified: result });
  }, 1000);
});

app.delete('/api/users/:id', async (req, res) => {
  log.request(req);
  const users = await getUsers();
  const index = users.findIndex((user) => user.id === req.params.id);
  const user = users[index];
  if (!user) {
    respond(res, 404, 'User not found');
    return;
  }
  users.splice(index, 1);
  const result = await writeData(users);
  setTimeout(() => respond(res, result ? 200 : 417, { deleted: result }), 1000);
});

app.listen(port, () => { });

console.log('** API is accessible at http://localhost:8888/ **');
