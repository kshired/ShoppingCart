const client = require('../../client');

const editItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock_quantity } = req.body;

  const updatedItem = await client.items.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      price,
      stock_quantity,
    },
  });

  if (updatedItem.id) {
    res.status(200).send({
      ok: true,
    });
  } else {
    res.status(401).send({
      ok: false,
      error: 'Could not update item',
    });
  }
};

module.exports = editItem;
