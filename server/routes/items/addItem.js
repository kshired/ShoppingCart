const client = require('../../client');

const addItem = async (req, res) => {
  const { name, price, stock_quantity } = req.body;
  try {
    const item = await client.items.create({
      data: {
        name,
        price,
        stock_quantity,
      },
    });
    res.status(200).send({
      ok: true,
      data: {
        ...item,
      },
    });
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = addItem;
