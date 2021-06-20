const client = require('../../client');

const getCartItems = async (req, res) => {
  const user_id = parseInt(req.id);
  const cartItems = await client.cartItem.findMany({
    where: {
      user_id,
    },
    include: {
      item: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });
  res.status(200).send({
    ok: true,
    data: cartItems,
  });
};

module.exports = getCartItems;
