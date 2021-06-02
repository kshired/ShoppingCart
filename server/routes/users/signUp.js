const bcrypt = require('bcrypt');
const client = require('../../client');
const jwt = require('../../auth/auth-jwt');

const signUp = async (req, res) => {
  const { username, city, zipcode, street, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await client.users.create({
      data: {
        username,
        city,
        zipcode,
        street,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(user);

    res.status(200).send({
      token,
    });
  } catch (err) {
    res.status(409).send({
      message: err.message,
    });
  }
};

module.exports = signUp;
