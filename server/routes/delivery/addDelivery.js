const client = require('../../client');

const addDelivery = async (req, res) => {
  const user_id = parseInt(req.id);
  const user = await client.users.findFirst({
    where: {
      id: user_id,
    },
  });

  if (user) {
    const { city, street, zipcode } = user;

    const delivery = await client.delivery.create({
      data: {
        city,
        street,
        zipcode,
      },
    });

    res.status(200).send({
      ok: true,
      data: {
        ...delivery,
      },
    });
  } else {
    res.status(401).send({
      ok: false,
      message: 'Not authorized',
    });
  }
};

module.exports = addDelivery;
