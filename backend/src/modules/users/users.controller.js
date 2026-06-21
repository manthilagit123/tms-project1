const usersService = require('./users.service');

async function createUserHandler(req, res, next) {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) { next(err); }
}

module.exports = { createUserHandler };
