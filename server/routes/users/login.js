const bcrypt = require('bcrypt');
const { Users } = require('../../models');
const jwt = require('../../auth/auth-jwt');

const login = async (req, res) => {
  const { name, password } = req.body;
  const user = await Users.findOne({
    where: {
      name,
    },
  });

  if (user) {
    const chk = await bcrypt.compare(password, user.password);
    if (chk) {
      const token = await jwt.sign(user);
      res.status(200).send({
        token,
      });
      return;
    } else {
      res.status(401).send({
        message: 'password is incorrect',
      });
      return;
    }
  }
  res.status(401).send({
    message: 'user not exist',
  });
};

module.exports = login;
