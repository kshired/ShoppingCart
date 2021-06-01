const { Users } = require('../../models');

const seeProfile = async (req, res) => {
  const user = await Users.findOne({
    where: {
      name: req.name,
    },
  });
  if (user) {
    const { name, city, zipcode, street } = user;
    res.status(200).send({
      user: {
        name,
        city,
        street,
        zipcode,
      },
    });
    return;
  }
  res.status(401).send({
    message: 'user not exist',
  });
};

const modifyProfile = async (req, res) => {
  const user = await Users.findOne({
    where: {
      name: req.name,
    },
  });

  if (user) {
    try {
      await Users.update(
        {
          ...req.body,
        },
        {
          where: {
            name: req.name,
          },
        }
      );
      res.status(200).send({
        message: 'ok',
      });
      return;
    } catch (err) {
      res.status(401).send({
        message: err.erros[0].message,
      });
    }
  }
  res.status(401).send({
    message: 'user not exist',
  });
};

module.exports = {
  seeProfile,
  modifyProfile,
};
