const client = require('../../client');
const { set } = require('../../utils/cache');

const getItemList = async (req, res) => {
  const { page } = req.query;

  if (isNaN(page)) {
    res.status(400).send({
      ok: false,
      message: 'Page number is not correct.',
    });
    return;
  }

  const items = await client.items.findMany({
    skip: (parseInt(page) - 1) * 15,
    take: 15,
  });

  if (items.length) {
    set(req.originalUrl, items);
    res.status(200).send({
      ok: true,
      data: items,
    });
  } else {
    res.status(404).send({
      ok: false,
      message: 'No more pages',
    });
  }
};

const getItemCount = async (_, res) => {
  const count = await client.items.count();
  res.status(200).send({
    ok: true,
    page: Math.ceil(count / 15),
  });
};

module.exports = {
  getItemList,
  getItemCount,
};
