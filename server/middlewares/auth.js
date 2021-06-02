const { verify } = require('../auth/auth-jwt');

const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = verify(token);
    if (result.split(' ')[0] === 'verified') {
      req.id = result.split(' ')[1];
      next();
    } else {
      res.status(401).send({
        message: result,
      });
    }
  }
};

module.exports = authJWT;
