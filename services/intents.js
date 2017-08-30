const RickAndMorty = require('rick-and-morty');
const Storage = require('../services/db');
const getAvatar = require('../services/avatar');
const models = require('../utils/models');
const INTENTS = require('../constants/intents');

const handleGif = async (intent, username) => {
  const { conversationToken } = intent;
  const reply = intent.reply();
  const token = await Storage.getConversationToken(username);
  let res;

  const gif = RickAndMorty.random();

  if (token) {
    res = [
      models.botMessage(reply, token),
      models.botMessage(gif, token, 'image')
    ];
  } else {
    await Storage.setConversationToken(username, conversationToken);
    res = [
      models.botMessage(reply, conversationToken),
      models.botMessage(gif, conversationToken, 'image')
    ];
  }

  return res;
};

const handleAvatar = async (intent, username) => {
  const { conversationToken, entities, action } = intent;
  const reply = intent.reply();
  const token = await Storage.getConversationToken(username);
  let res;
  let avatar;

  const handleAvatarResults = (reply, token, avatar) => {
    let result = [];

    result = result.concat(models.botMessage(reply, token));

    if (avatar) {
      result = result.concat(models.botMessage(avatar, token, 'image'));
    }

    return result;
  };

  if (action.done) {
    const { pseudo } = entities;
    if (pseudo && pseudo.length) {
      const [{ value }] = pseudo;
      avatar = getAvatar(value);
    }
  }

  if (token) {
    res = handleAvatarResults(reply, token, avatar);
  } else {
    await Storage.setConversationToken(username, conversationToken);
    res = handleAvatarResults(reply, conversationToken, avatar);
  }

  return res;
};

const handleGreetings = async (intent, username) => {
  const { conversationToken } = intent;
  const greeted = await Storage.getGreeted(username);
  let res;

  intent.resetConversation();
  await Storage.setConversationToken(username, conversationToken);

  if (greeted) {
    const reply = intent.reply();
    res = [models.botMessage(reply, conversationToken)];
  } else {
    const replies = [
      `Hello, I'm Rick Sanchez baabbbyy!`,
      `Welcome to Dimension C137.`,
      `You know what ?`,
      `I can show you some gifs of my favorite show. Just ask to see some gif from Rick and Morty or something.`,
      `Also, I can generate profile pictures. Just say create an avatar for the pseudo something-something. I'll create an awesome avatar like the one you have right now !`
    ];

    res = replies.map(rep => models.botMessage(rep, conversationToken));
    await Storage.setGreeted(username, true);
  }

  return res;
};

const handleGoodbye = async (intent, username) => {
  const reply = intent.reply();
  await Storage.setConversationToken(username, null);
  await Storage.setGreeted(username, false);
  intent.resetConversation();

  return [models.botMessage(reply)];
};

const handleOthers = async (intent, username) => {
  const { conversationToken } = intent;
  const reply = intent.reply();
  const token = await Storage.getConversationToken(username);
  let res;

  if (token) {
    res = models.botMessage(reply, token);
  } else {
    await Storage.setConversationToken(username, conversationToken);
    res = models.botMessage(reply, conversationToken);
  }

  return [res];
};

const handleIntents = async (intent, username) => {
  const { action: { slug } } = intent;
  if (slug) {
    switch (slug) {
      case INTENTS.GREETINGS:
        return handleGreetings(intent, username);
      case INTENTS.GENERATE_AVATAR:
        return handleAvatar(intent, username);
      case INTENTS.RICK_AND_MORTY:
        return handleGif(intent, username);
      case INTENTS.GOODBYE:
        return handleGoodbye(intent, username);
      default:
        return handleOthers(intent, username);
    }
  }
};

module.exports = handleIntents;
