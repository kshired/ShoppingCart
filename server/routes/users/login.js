const bcrypt = require('bcrypt');
const client = require('../../client');
const jwt = require('../../auth/auth-jwt');

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await client.users.findFirst({
    where: {
      username,
    },
  });

  if (user) {
    const chk = await bcrypt.compare(password, user.password);
    if (chk) {
      const token = jwt.sign(user);
      res.status(200).send({
        ok: true,
        data: {
          token,
        },
      });
      return;
    } else {
      res.status(401).send({
        ok: false,
        message: 'password is incorrect',
      });
      return;
    }
  }
  res.status(401).send({
    ok: false,
    message: 'user not exist',
  });
};

module.exports = login;
