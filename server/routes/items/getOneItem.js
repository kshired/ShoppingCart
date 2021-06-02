const client = require('../../client');

const getOneItem = async (req, res) => {
  const { id } = req.params;
  const item = await client.items.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (item) {
    res.status(200).send({
      ok: true,
      data: {
        ...item,
      },
    });
  } else {
    res.status(404).send({
      ok: false,
      message: 'Item is not exist!',
    });
  }
};

module.exports = getOneItem;
