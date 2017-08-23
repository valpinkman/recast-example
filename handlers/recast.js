const Recastai = require('recastai').default;

const client = new Recastai('a901658c9e280500da50a8f58181f9f9').request;

const converse = async (text, conversationToken = null) => {
  let res;
  try {
    if (conversationToken) {
      res = await client.converseText(text, { conversationToken });
      return res;
    }

    res = await client.converseText(text);
    return res;
  } catch (err) {
    console.log(err);
  }
}

const handler = async (req, res) => {
  const { text, conversationToken } = req.body;
  const message = await converse(text, conversationToken);
  res.json(message);
};

module.exports = handler;
