const bcrypt = require('bcrypt');
const { Users } = require('../../models');

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
      res.send(true);
      return;
    }
  }
  res.send(false);
};

module.exports = login;
