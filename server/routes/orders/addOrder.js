const client = require('../../client');

const addOrder = async (req, res) => {
  const user_id = parseInt(req.id);
  const { delivery_id, items } = req.body;
  /*
    {
      delivery_id,
      items:[
        {
          item_id,
          count,
          price
        }
      ]
    }
  */

  try {
    const order = await client.orders.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        delivery: {
          connect: {
            id: delivery_id,
          },
        },
        status: true,
      },
    });

    for (item of items) {
      const { item_id, count, price } = item;
      await client.orderItem.create({
        data: {
          count,
          price,
          item: {
            connect: {
              id: item_id,
            },
          },
          order: {
            connect: {
              id: order.id,
            },
          },
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
          stock_quantity: findItem.stock_quantity - count,
        },
      });
    }
    const { id, order_date, status } = order;
    res.status(200).send({
      ok: true,
      data: {
        id,
        order_date,
        status,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = addOrder;
