const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
  signUp(req, res) {
    (async () => {
      try {
        const {
          firstName, lastName, email, password, isAdmin,
        } = req.body;

        const checkExistingUser = await User.findAll({
          where: { email },
        });
        if (checkExistingUser.length > 0) {
          return res.status(400).json({ status: 400, error: 'User account exists!' });
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = {
          firstName, lastName, email, password: hash, isAdmin,
        };
        const createUser = await User.create(newUser);
        const { dataValues } = createUser;
        return res.status(201).json({
          status: 201,
          data: {
            firstName: dataValues.firstName,
            lastName: dataValues.lastName,
            email: dataValues.email,
            isAdmin: dataValues.isAdmin,
          },
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
    })();
  },
  signIn(req, res) {
    (async () => {
      try {
        const { email, password } = req.body;
        const checkUser = await User.findAll({ where: { email } });
        if (checkUser.length === 0) {
          return res.status(400).json({ status: 400, error: 'User not found' });
        }
        const compareHash = await bcrypt.compare(password, checkUser[0].dataValues.password);
        if (!compareHash) {
          return res.status(401).json({
            status: 401,
            error: 'Incorrect email or password',
          });
        }
        const { dataValues } = checkUser[0];
        const token = await jwt.sign(
          { userId: dataValues.userId, email: dataValues.email, isAdmin: dataValues.isAdmin },
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' },
        );
        res.cookie('jwtsignin', token, {
          maxAge: 60 * 60 * 1000, // 1 hour
          httpOnly: true,
          // secure: true,
          sameSite: true,
        });
        return res.status(200).json({
          userId: dataValues.userId,
          email: dataValues.email,
          isAdmin: dataValues.isAdmin,
          token,
        });
      } catch (error) {
        return res.status(500).json({
          error,
        });
      }
    })();
  },
};
