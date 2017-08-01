import storage from 'localforage';

// MODELS
//
// Message = {
//   user: string,
//   text: string,
//   posted: timestamp
// };
//
// Conversation = {
//   id: number,
//   user: string,
//   receiver: string,
//   messages: [Message]
// };

let conversationId = storage.getItem('lastSavedId') || 0;

/**
 *
 * @class Storage
 * @description since this is a demo app, I did not plug
 * a real database to the app. Instead I'm using whichever
 * storage is avaible to fake a database
 */
class Storage {
  static setUsername(username) {
    console.log('Storage > setUsername()', username);
    return storage.setItem('username', username);
  }

  static getUsername() {
    return storage.getItem('username');
  }

  static async setConversation(message = {}, id = undefined) {
    if (id) {
      const item = await storage.getItem(id);
      if (item) {
        await storage.setItem(id, item.concat(message));
        return id;
      }
    }

    await storage.setItem(conversationId++, [].concat(message));
    storage.setItem('lastSavedId', conversationId);
    return conversationId;
  }

  static async getConversation(id) {
    if (id) {
      const item = await storage.getItem(id);
      return item;
    }
  }

  static async getAllConversations(conversations = []) {
    const list = conversations.length ? conversations : await storage.keys();

    return list.map(async id => {
      const item = await Storage.getConversation(id);
      if (item) {
        return item;
      }
    });
  }
}

export default Storage;
