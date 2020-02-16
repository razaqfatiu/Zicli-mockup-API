const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

module.exports = {
  userInputValidation: [
    body('firstName', 'Firstname field cannot be empty').trim()
      .not().isEmpty(),
    body('lastName', 'Last Namefield cannot be empty').trim()
      .not()
      .isEmpty(),
    body('email', 'Enter a valid email').isEmail().trim()
      .not()
      .isEmpty(),
    body('password', 'Password cannot be empty and requires at least 6 character')
      .isLength({ min: 3 }).trim()
      .not()
      .isEmpty(),
    body('isAdmin', 'Specify user type')
      .not().isEmpty(),
  ],
  signUp(req, res) {
    (async () => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
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
