const client = require('../../client');

const addItem = async (req, res) => {
  const { name, price, stock_quantity } = req.body;
  try {
    await client.items.create({
      data: {
        name,
        price,
        stock_quantity,
      },
    });
    res.status(200).send({
      ok: true,
      name,
      price,
      stock_quantity,
    });
  } catch (err) {
    res.status(404).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = addItem;
