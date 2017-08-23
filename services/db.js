import storage from 'localforage';

// MODELS
//
// Message = {
//   user: string,
//   me: boolean,
//   text: string,
//   posted: timestamp
// };
//
// Conversation = {
//   id: number,
//   messages: [Message]
// };

/**
 *
 * @class Storage
 * @description since this is a demo app, I did not plug
 * a real database to the app. Instead I'm using whichever
 * storage is avaible to fake a database
 */
class Storage {
  static async setUsername(username) {
    console.log('Storage > setUsername()', username);
    await storage.setItem('username', username);
    return Storage.getUsername();
  }

  static async getUsername() {
    return storage.getItem('username');
  }

  static async updateConversation(message = {}) {
    const item = await storage.getItem('conversation');

    if (item) {
      await storage.setItem('conversation', item.messages.concat(message));
      return Storage.getConversation();
    }

    const payload = {
      id: message.conversationToken || 0,
      messages: [].concat(message)
    };

    await storage.setItem('conversation', payload);
    return Storage.getConversation();
  }

  static async getConversation() {
    const conversation = await storage.getItem('conversation');
    return conversation;
  }
}

export default Storage;
