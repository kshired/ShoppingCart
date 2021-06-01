const bcrypt = require('bcrypt');
const { Users } = require('../../models');
const jwt = require('../../auth/auth-jwt');

const signUp = async (req, res) => {
  const { name, city, zipcode, street, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await Users.create({
      name,
      city,
      zipcode,
      street,
      password: hashedPassword,
    });
    const token = await jwt.sign(user);

    res.status(200).send({
      token,
    });
  } catch (err) {
    res.status(409).send({
      message: err.errors[0].message,
    });
  }
};

module.exports = signUp;
