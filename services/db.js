const firebase = require('./firebase');

/**
 *
 * @model Token
 * @type String | Undefined
 *
 *
 * @model Message
 * @type Message = {
 *   user: {String},
 *   me: {Boolean}
 *   text: {String}
 *   posted: {Number}
 *   conversationToken: {Token}
 *   type?: {String}
 * }
 *
 * @model Conversation
 * @type Converstion = {
 *   id: {Token}
 *   messages: {[Message]}
 *   greeted: {Boolean}
 *   username: {String}
 * }
 */

/**
 *
 * @class Storage
 * @description since this is a demo app, I did not plug
 * a real database to the app. Instead I'm using a Class to
 * store the data.
 */
class Storage {
  constructor() {
    this.database = firebase;
  }

  /**
  *
  * @name setUsername
  * @memberof Storage
  * @description set a new name to be used in messages and for the avatar
  * @param username {String} current user
  * @returns {String} the newly set username
  */
  async setUsername(username) {
    const ref = this.database.ref(`conversations/${username}`);
    const value = await ref.once('value');
    const user = value.val();

    if (user && user.username) {
      return ref;
    }

    await this.database.ref(`conversations/${username}`).set({ username });
    return ref;
  }

  /**
  *
  * @name updateConversation
  * @memberof Storage
  * @description update the conversation with the new message.
  * @param username {String} current user
  * @param message {Message} the new message that will be stored in db
  * @returns {Conversation} the current conversation
  */
  async updateConversation(username, message = {}) {
    await this.database.ref(`conversations/${username}`).child('messages').push(message);
  }

  /**
  *
  * @name getConversation
  * @memberof Storage
  * @description get the current conversation
  * @param username {String} current user
  * @returns {Conversation} the current conversation
  */
  async getConversation(username) {
    const value = await this.database.ref(`conversations/${username}`).once('value');
    const user = value.val();

    if (user) {
      return user;
    }
  }

  /**
   *
   * @name getConversationToken
   * @memberof Storage
   * @description returns the conversation token or undefined
   * @param username {String} current user
   * @returns {Token}
   */
  async getConversationToken(username) {
    const value = await this.database.ref(`conversations/${username}`).once('value');
    const user = value.val();

    if (user && user.id) {
      return user.id;
    }

    const token = await this.setConversationToken(username, undefined);
    return token;
  }

  /**
   *
   * @name setConversationToken
   * @memberof Storage
   * @description sets a new conversation token
   * @param username {String} current user
   * @param token {Token) new token
   * @returns {Token}
   */
  async setConversationToken(username, token) {
    await this.database.ref(`conversations/${username}`).update({ id: token });
    return token;
  }

  /**
  *
  * @name getGreeted
  * @memberof Storage
  * @description returns the greeted status (start of conversation)
  * @param username {String} current user
  * @returns {Boolean}
  */
  async getGreeted(username) {
    const value = await this.database.ref(`conversations/${username}`).once('value');
    const user = value.val();

    if (user && user.greeted) {
      return user.greeted;
    }

    const greeted = await this.setGreeted(username, false);
    return greeted;
  }

  /**
  *
  * @name setGreeted
  * @memberof Storage
  * @description sets the greeted status (start of conversation)
  * @param username {String} current user
  * @param bool {Boolean} greeted status
  * @returns {Boolean}
  */
  async setGreeted(username, bool) {
    await this.database.ref(`conversations/${username}`).update({ greeted: bool });
  }
}

const storage = new Storage();
module.exports = storage;
