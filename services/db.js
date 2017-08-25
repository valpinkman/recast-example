// MODELS
//
// Message = {
//   user: string,
//   me: boolean,
//   text: string,
//   posted: timestamp
//   conversationToken: string,
//   type?: string
// };
//
// Conversation = {
//   id: string,
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
  constructor() {
    this.username = undefined;
    this.conversation = undefined;
  }

  async setUsername(username) {
    this.username = username;
    return this.username;
  }

  async getUsername() {
    return this.username;
  }

  async updateConversation(message = {}, reset) {
    const item = this.conversation;
    let id;

    if (reset) {
      id = message.conversationToken;
    } else {
      id = item && item.id ? item.id : message.conversationToken;
    }

    const conversation = {
      id,
      messages: item ? item.messages.concat(message) : [].concat(message)
    };

    this.conversation = conversation;
    return this.conversation;
  }

  async getConversation() {
    return this.conversation;
  }
}

export default new Storage();
