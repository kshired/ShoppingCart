const client = require('../../client');

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await client.users.delete({
      where: {
        id,
      },
    });

    res.status(200).send({
      ok: true,
    });
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = deleteItem;
