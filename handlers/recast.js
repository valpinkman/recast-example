const Recastai = require('recastai').default;
const token = require('../config').token;
const handleIntents = require('./../services/intents');

const client = new Recastai(token).request;

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
};

const handler = async (req, res) => {
  const { text, conversationToken, username } = req.body;
  const intent = await converse(text, conversationToken);
  const message = await handleIntents(intent, username);
  res.json(message);
};

module.exports = handler;
