const client = require('../../client');

const editItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock_quantity, picture } = req.body;

  const updatedItem = await client.items.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      price,
      picture,
      stock_quantity,
    },
  });

  if (updatedItem.id) {
    res.status(200).send({
      ok: true,
      data: {
        id: updatedItem.id,
        name: updatedItem.name,
        price: updatedItem.price,
        stock_quantity: updatedItem.stock_quantity,
      },
    });
  } else {
    res.status(404).send({
      ok: false,
      error: 'Could not update item',
    });
  }
};

module.exports = editItem;
