const bcrypt = require('bcrypt');
const client = require('../../client');
const jwt = require('../../auth/auth-jwt');
const { redisClient } = require('../../utils/cache');

const login = async (req, res) => {
  const { username, password } = req.body;
  // to do : check username, password are not undefined
  // if undefined return 400
  const user = await client.users.findFirst({
    where: {
      username,
    },
  });

  if (user) {
    const chk = await bcrypt.compare(password, user.password);
    if (chk) {
      const accessToken = jwt.sign(user);
      const refreshToken = jwt.refresh();

      redisClient.set(username, refreshToken);

      res.status(200).send({
        ok: true,
        data: {
          accessToken,
          refreshToken,
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
