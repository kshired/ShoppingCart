const client = require('../../client');

const getDelivery = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const delivery = await client.delivery.findFirst({
      where: {
        id,
      },
    });

    res.status(200).send({
      ok: true,
      data: {
        ...delivery,
      },
    });
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = getDelivery;
