const client = require('../../client');

const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const findOrder = await client.orders.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    const order_items = await client.orderItem.findMany({
      where: {
        order_id: parseInt(id),
      },
    });

    for (order_item of order_items) {
      const { id, item_id, count } = order_item;
      await client.orderItem.delete({
        where: {
          id,
        },
      });

      const findItem = await client.items.findFirst({
        where: {
          id: item_id,
        },
        select: {
          stock_quantity: true,
        },
      });

      await client.items.update({
        where: {
          id: item_id,
        },
        data: {
          stock_quantity: findItem.stock_quantity + count,
        },
      });
    }

    await client.orders.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).send({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = cancelOrder;
