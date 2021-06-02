const client = require('../../client');

const deleteCartItem = async (req, res) => {
  const user_id = parseInt(req.id);
  let { item_id, count } = req.body;

  item_id = parseInt(item_id);

  const cartItem = await client.cartItem.findFirst({
    where: {
      user_id,
      item_id,
    },
  });
  if (cartItem) {
    try {
      if (count >= cartItem.count) {
        await client.cartItem.delete({
          where: {
            user_id_item_id: {
              user_id,
              item_id,
            },
          },
        });
      } else {
        await client.cartItem.update({
          where: {
            user_id_item_id: {
              user_id,
              item_id,
            },
          },
          data: {
            count: cartItem.count - count,
          },
        });
      }
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
  } else {
    res.status(400).send({
      ok: false,
      message: 'This cart item is not exist!',
    });
  }
};

module.exports = deleteCartItem;
