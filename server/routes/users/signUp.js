const bcrypt = require('bcrypt');
const { Users } = require('../../models');

const signUp = async (req, res) => {
  const { name, city, zipcode, street, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Users.create({
    name,
    city,
    zipcode,
    street,
    password: hashedPassword,
  });

  res.send(user);
};

module.exports = signUp;
