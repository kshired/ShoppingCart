const client = require('../../client');

const changeDeliveryStatus = async (req, res) => {
  let { id, status } = req.body;

  try {
    const updatedDelivery = await client.delivery.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
      },
    });
    res.status(200).send({
      ok: true,
      data: {
        ...updatedDelivery,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = changeDeliveryStatus;
