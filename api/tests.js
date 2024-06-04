const assert = require('assert');
const fs = require('fs');
const tests = require('./modules/tests.module.js');

function stripIds(data) {
  return JSON.parse(data).map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  }));
}

// get /api/users - 200
tests.add({
  should: 'return a list a users',
  method: 'get',
  path: '/api/users',
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 200);
    assert.deepEqual(
      stripIds(data),
      [
        { "name": "Jean-Luc Picard", "email": "jeanlucpicard@startfleet.space", "role": "admin", "status": "active" },
        { "name": "William Riker", "email": "williamriker@startfleet.space", "role": "admin", "status": "active" },
        { "name": "Worf", "email": "worf@startfleet.space", "role": "developer", "status": "active" },
        { "name": "Geordi La Forge", "email": "geordilaforge@startfleet.space", "role": "developer", "status": "active" },
        { "name": "Beverly Crusher", "email": "beverlycrusher@startfleet.space", "role": "developer", "status": "deactivated" },
        { "name": "Deanna Troi", "email": "deanatroi@startfleet.space", "role": "user", "status": "deactivated" },
        { "name": "Wesley Crusher", "email": "wesleycrusher@startfleet.space", "role": "user", "status": "active" },
        { "name": "Tasha Yar", "email": "tashayar@startfleet.space", "role": "developer", "status": "deactivated" },
      ],
    );
  },
});

// get /api/users/18e6d8357fd
tests.add({
  should: 'return a single user',
  method: 'get',
  path: '/api/users/18e6d8357fd',
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 200);
    assert.deepEqual(
      JSON.parse(data),
      { id: '18e6d8357fd', name: 'Jean-Luc Picard', email: 'jeanlucpicard@startfleet.space', role: 'admin', status: 'active' },
    );
  },
});

// get /api/users/does_not_exist - 404
tests.add({
  should: 'return 404 not found if user ID does not match any users',
  method: 'get',
  path: '/api/users/does_not_exist',
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 404);
    assert.strictEqual(data, "User not found");
  },
});

// post /api/users - 201
tests.add({
  should: 'add new user',
  method: 'post',
  path: '/api/users',
  payload: { name: 'Miles O\'Brien', email: 'milesobrien@startfleet.space', role: 'user', status: 'deactivated' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 201);
    assert.deepEqual(
      JSON.parse(data),
      { "created": 1 },
    );
  },
});

// delete /api/users/18e776a644f - 200
tests.add({
  should: 'remove a user',
  method: 'delete',
  path: '/api/users/18e776a644f',
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 200);
    assert.deepEqual(
      JSON.parse(data),
      { "deleted": 1 },
    );
  },
});

// get /api/users - 200
tests.add({
  should: 'return a list a users (expects user with id \'18e776a644f\' to be removed)',
  method: 'get',
  path: '/api/users',
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 200);
    assert.deepEqual(
      stripIds(data),
      [
        { "name": "Jean-Luc Picard", "email": "jeanlucpicard@startfleet.space", "role": "admin", "status": "active" },
        { "name": "William Riker", "email": "williamriker@startfleet.space", "role": "admin", "status": "active" },
        { "name": "Worf", "email": "worf@startfleet.space", "role": "developer", "status": "active" },
        { "name": "Geordi La Forge", "email": "geordilaforge@startfleet.space", "role": "developer", "status": "active" },
        { "name": "Deanna Troi", "email": "deanatroi@startfleet.space", "role": "user", "status": "deactivated" },
        { "name": "Wesley Crusher", "email": "wesleycrusher@startfleet.space", "role": "user", "status": "active" },
        { "name": "Tasha Yar", "email": "tashayar@startfleet.space", "role": "developer", "status": "deactivated" },
        { "name": "Miles O'Brien", "email": "milesobrien@startfleet.space", "role": "user", "status": "deactivated" },
      ],
    );
  },
});

// post /api/users - 400
tests.add({
  should: 'not allow posting payload with additional properties',
  method: 'post',
  path: '/api/users',
  payload: { id: 'lakdsjlaksdjf', name: 'William Riker', email: 'williamriker@startfleet.space', role: 'admin', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Invalid input: expecting exactly 4 properties, 'email', 'name', 'role', and 'status'");
  },
});

// post /api/users - 400
tests.add({
  should: 'not allow posting payload with all required properties',
  method: 'post',
  path: '/api/users',
  payload: { email: 'williamriker@startfleet.space', role: 'admin', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Invalid input: expecting exactly 4 properties, 'email', 'name', 'role', and 'status'");
  },
});

// post /api/users - 400
tests.add({
  should: 'not allow posting payload with invalid type for \'name\'',
  method: 'post',
  path: '/api/users',
  payload: { name: 32341234, email: 'williamriker@startfleet.space', role: 'admin', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for name must be a string. '32341234' was sent.");
  },
});

// post /api/users - 400
tests.add({
  should: 'not allow posting payload with invalid type for \'email\'',
  method: 'post',
  path: '/api/users',
  payload: { name: 'William Riker', email: true, role: 'admin', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for email must be a string. 'true' was sent.");
  },
});

// post /api/users - 400
tests.add({
  should: 'not allow posting payload with invalid type for \'role\'',
  method: 'post',
  path: '/api/users',
  payload: { name: 'William Riker', email: 'williamriker@startfleet.space', role: 'skipper', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for role must be a valid option. 'skipper' was sent, expecting 'admin', 'developer', or 'user'.");
  },
});

// post /api/users - 400
tests.add({
  should: 'not allow posting payload with invalid type for \'status\'',
  method: 'post',
  path: '/api/users',
  payload: { name: 'William Riker', email: 'williamriker@startfleet.space', role: 'admin', status: 'awol' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for status must be a valid option. 'awol' was sent, expecting 'active', or 'deactivated'.");
  },
});

// put /api/users/18e76fc4e4f - 201
tests.add({
  should: 'update existing user\'s role and status',
  method: 'put',
  path: '/api/users/18e76fc4e4f',
  payload: { role: 'user', status: 'deactivated' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 201);
    assert.deepEqual(
      JSON.parse(data),
      { "modified": 1 },
    );
  },
});

// get /api/users/18e76fc4e4f - 200
tests.add({
  should: 'return a single user (expects updated role and status)',
  method: 'get',
  path: '/api/users/18e76fc4e4f',
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 200);
    assert.deepEqual(
      JSON.parse(data),
      { id: '18e76fc4e4f', name: 'Worf', email: 'worf@startfleet.space', role: 'user', status: 'deactivated' },
    );
  },
});

// put /api/users/18e76fc4e4f - 400
tests.add({
  should: 'not allow putting payload with invalid type for \'name\'',
  method: 'put',
  path: '/api/users/18e76fc4e4f',
  payload: { name: 32341234, email: 'worf@startfleet.space', role: 'admin', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for name must be a string. '32341234' was sent.");
  },
});

// put /api/users/18e76fc4e4f - 400
tests.add({
  should: 'not allow putting payload with invalid type for \'email\'',
  method: 'put',
  path: '/api/users/18e76fc4e4f',
  payload: { name: 'Worf', email: true, role: 'admin', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for email must be a string. 'true' was sent.");
  },
});

// put /api/users/18e76fc4e4f - 400
tests.add({
  should: 'not allow putting payload with invalid type for \'role\'',
  method: 'put',
  path: '/api/users/18e76fc4e4f',
  payload: { name: 'Worf', email: 'worf@startfleet.space', role: 'skipper', status: 'active' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for role must be a valid option. 'skipper' was sent, expecting 'admin', 'developer', or 'user'.");
  },
});

// put /api/users/18e76fc4e4f - 400
tests.add({
  should: 'not allow putting payload with invalid type for \'status\'',
  method: 'put',
  path: '/api/users/18e76fc4e4f',
  payload: { name: 'Worf', email: 'worf@startfleet.space', role: 'admin', status: 'awol' },
  run: ({ statusCode, data }) => {
    assert.strictEqual(statusCode, 400);
    assert.strictEqual(data, "Value for status must be a valid option. 'awol' was sent, expecting 'active', or 'deactivated'.");
  },
});

tests.run();
