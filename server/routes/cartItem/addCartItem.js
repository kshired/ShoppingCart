const client = require('../../client');

const addCartItem = async (req, res) => {
  const user_id = parseInt(req.id);
  let { item_id, count } = req.body;

  item_id = parseInt(item_id);
  count = parseInt(count);

  const item = await client.items.findFirst({
    where: {
      id: item_id,
    },
  });

  if (item && item.stock_quantity >= count) {
    try {
      await client.cartItem.create({
        data: {
          count,
          price: count * item.price,
          user: {
            connect: {
              id: user_id,
            },
          },
          item: {
            connect: {
              id: item_id,
            },
          },
        },
      });
      res.status(200).send({
        ok: true,
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).send({
        ok: false,
        message: err.message,
      });
    }
    return;
  } else {
    res.status(400).send({
      ok: false,
      message: 'Out of stock!',
    });
  }
};

module.exports = addCartItem;
