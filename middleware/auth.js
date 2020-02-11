/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  auth(req, res, next) {
    (async () => {
      try {
        if (typeof req.headers.authorization !== 'string') {
          res.sendStatus(400);
          return;
        }
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
        const { userId, email, isAdmin } = decodedToken;
        req.user = {
          id: userId, email, isAdmin, token,
        };
        if (req.body.userId && req.body.userId !== userId) {
          return res.status(401).json({ message: 'Invalid User' });
        }
        return next();
      } catch (error) {
        res.status(401).json({
          error,
        });
      }
    })();
  },
};
