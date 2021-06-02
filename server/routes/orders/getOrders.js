const client = require('../../client');

const getOrdersList = async (req, res) => {
  const { page } = req.query;

  if (isNaN(page)) {
    res.status(400).send({
      ok: false,
      message: 'Page number is not correct.',
    });
    return;
  }

  try {
    const orders = await client.orders.findMany({
      where: {
        user_id: parseInt(req.id),
      },
      skip: (parseInt(page) - 1) * 10,
      take: 10,
    });
    res.status(200).send({
      ok: true,
      data: orders,
    });
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

const getPages = async (req, res) => {
  const count = await client.orders.count({
    where: {
      user_id: parseInt(req.id),
    },
  });
  res.status(200).send({
    ok: true,
    page: Math.ceil(count / 20),
  });
};

module.exports = {
  getOrdersList,
  getPages,
};
