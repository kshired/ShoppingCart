const client = require('../../client');

const getOrderItems = async (req, res) => {
  const { id } = req.params;

  try {
    const orderItems = await client.orderItem.findMany({
      where: {
        order_id: parseInt(id),
      },
    });
    if (orderItems.length === 0) {
      res.status(200).send({
        ok: false,
        message: 'This order is not exist!',
      });
    } else {
      let ret = [];
      for ({ item_id, count, price } of orderItems) {
        ret.push({
          item_id,
          count,
          price,
        });
      }

      res.status(200).send({
        ok: true,
        data: ret,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = getOrderItems;
