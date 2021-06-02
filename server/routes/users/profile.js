const client = require('../../client');
const bcrypt = require('bcrypt');
const seeProfile = async (req, res) => {
  const { id } = req;
  const user = await client.users.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  if (user) {
    const { username, city, zipcode, street } = user;
    res.status(200).send({
      ok: true,
      data: {
        username,
        city,
        zipcode,
        street,
      },
    });
    return;
  }
  res.status(401).send({
    ok: false,
    message: 'user not exist',
  });
};

const modifyProfile = async (req, res) => {
  const { id } = req;
  const { city, zipcode, street, password } = req.body;
  let newPassword = null;
  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }

  const updatedUser = await client.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      city,
      zipcode,
      street,
      ...(newPassword && { password: newPassword }),
    },
  });

  if (updatedUser.id) {
    res.status(200).send({
      ok: true,
    });
  } else {
    res.status(401).send({
      ok: false,
      error: 'Could not update profile',
    });
  }
};

module.exports = {
  seeProfile,
  modifyProfile,
};
